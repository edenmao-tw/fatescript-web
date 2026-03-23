from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import swisseph as swe
from datetime import datetime
import pytz

app = FastAPI(title="FateScript Calculator", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fatescript.pro", "https://tw.fatescript.pro", "http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

class BirthInput(BaseModel):
    date: str           # YYYY-MM-DD
    time: Optional[str] = "12:00"  # HH:MM
    latitude: float
    longitude: float
    timezone: str

PLANETS = {
    'sun':     swe.SUN,
    'moon':    swe.MOON,
    'mars':    swe.MARS,
    'mercury': swe.MERCURY,
    'jupiter': swe.JUPITER,
    'venus':   swe.VENUS,
    'saturn':  swe.SATURN,
    'rahu':    swe.TRUE_NODE,    # 羅睺 (North Node)
}

SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
         'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']

SIGN_ZH = ['白羊','金牛','雙子','巨蟹','獅子','室女',
           '天秤','天蠍','射手','摩羯','水瓶','雙魚']

# Planet dignities per sign (廟旺陷落)
# Format: {planet: {sign_index: dignity}}
DIGNITIES = {
    'sun':     {4:'miao', 0:'wang', 6:'xian', 10:'luo'},
    'moon':    {3:'miao', 1:'wang', 9:'xian', 7:'luo'},
    'mars':    {0:'miao', 9:'wang', 6:'xian', 3:'luo'},
    'mercury': {5:'miao', 2:'miao', 11:'wang', 3:'xian', 9:'luo'},
    'jupiter': {8:'miao', 3:'wang', 2:'xian', 11:'luo'},
    'venus':   {1:'miao', 7:'miao', 11:'wang', 5:'xian', 3:'luo'},
    'saturn':  {9:'miao', 10:'miao', 6:'wang', 0:'xian', 3:'luo'},
}

def get_dignity(planet: str, sign: int) -> str:
    d = DIGNITIES.get(planet, {})
    return d.get(sign, 'ping')

def birth_to_jd(date_str: str, time_str: str, tz_str: str) -> float:
    tz = pytz.timezone(tz_str)
    dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
    dt_local = tz.localize(dt)
    dt_utc = dt_local.astimezone(pytz.utc)
    jd = swe.julday(dt_utc.year, dt_utc.month, dt_utc.day,
                    dt_utc.hour + dt_utc.minute/60.0)
    return jd

@app.post("/calculate")
def calculate_chart(data: BirthInput):
    try:
        swe.set_ephe_path('/usr/share/ephe')
        jd = birth_to_jd(data.date, data.time or "12:00", data.timezone)

        # Calculate houses (Placidus)
        houses_data, ascmc = swe.houses(jd, data.latitude, data.longitude, b'P')
        ascendant = ascmc[0]
        asc_sign = int(ascendant / 30)

        def get_house(lon: float) -> int:
            for i in range(11):
                cusp_start = houses_data[i]
                cusp_end = houses_data[i+1] if i < 11 else houses_data[0] + 360
                if cusp_start <= lon < cusp_end:
                    return i + 1
            return 12

        # Calculate planets
        planets_out = []
        for name, planet_id in PLANETS.items():
            result, _ = swe.calc_ut(jd, planet_id)
            lon = result[0]
            sign = int(lon / 30)
            house = get_house(lon)
            dignity = get_dignity(name, sign)
            retrograde = result[3] < 0

            # For Ketu (South Node) = Rahu + 180
            if name == 'rahu':
                planets_out.append({
                    'planet': name, 'longitude': lon,
                    'sign': sign, 'signName': SIGNS[sign], 'signZh': SIGN_ZH[sign],
                    'house': house, 'dignity': dignity, 'retrograde': retrograde
                })
                ketu_lon = (lon + 180) % 360
                ketu_sign = int(ketu_lon / 30)
                planets_out.append({
                    'planet': 'ketu', 'longitude': ketu_lon,
                    'sign': ketu_sign, 'signName': SIGNS[ketu_sign], 'signZh': SIGN_ZH[ketu_sign],
                    'house': get_house(ketu_lon), 'dignity': 'ping', 'retrograde': False
                })
            else:
                planets_out.append({
                    'planet': name, 'longitude': lon,
                    'sign': sign, 'signName': SIGNS[sign], 'signZh': SIGN_ZH[sign],
                    'house': house, 'dignity': dignity, 'retrograde': retrograde
                })

        # Determine Life Star (命主星) = ruler of Ascendant sign
        rulers = ['mars','venus','mercury','moon','sun','mercury','venus','mars','jupiter','saturn','saturn','jupiter']
        life_star = rulers[asc_sign]

        # Houses output
        houses_out = []
        for i in range(12):
            cusp = houses_data[i]
            sign = int(cusp / 30)
            ruler = rulers[sign]
            planets_in_house = [p['planet'] for p in planets_out if p['house'] == i+1]
            houses_out.append({
                'number': i+1, 'cusp': cusp,
                'sign': sign, 'signName': SIGNS[sign], 'signZh': SIGN_ZH[sign],
                'ruler': ruler, 'planets': planets_in_house
            })

        return {
            'ascendant': ascendant,
            'ascendantSign': asc_sign,
            'lifeStar': life_star,
            'bodyStar': life_star,  # simplified - full calculation TBD
            'planets': planets_out,
            'houses': houses_out,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}
