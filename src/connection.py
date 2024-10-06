import json
import requests
import sys
serviceUrl = "https://m2m.cr.usgs.gov/api/api/json/stable/"
url = serviceUrl + "login-token"
# login-token
payload = {"username" : "juanoso", "token" : "QHWfLl4s5!!SU83elzPco_4@kByJ__bCS6JPIXTi4Yh38m8OQh7lkUlyqhMxskQ9"}
json_data = json.dumps(payload)
response = requests.post(url, json_data)
try:
  httpStatusCode = response.status_code 
  if response == None:
    print("No output from service")
    sys.exit()

  output = json.loads(response.text) 
  if output['errorCode'] != None:
    print(output)
    sys.exit()
  if httpStatusCode == 404:
    print("404 Not Found")
    sys.exit()
  elif httpStatusCode == 403: 
    print("401 Unauthorized")
    sys.exit()
  elif httpStatusCode == 500:
    print("Error Code", httpStatusCode)
    sys.exit()
except Exception as e: 
  response.close()
  print(e)
 
response.close()
apiKey = output['data']

# url = serviceUrl + "dataset-search"
# params = {
#   'datasetName': 'landsat_ot_c2_l2',
#   # 'entityId': 'LC08_L2SP_012025_20201231_20210308_02_T1',
#   # "idType": "displayId",
#   # "metadataType": "full",
#   # "useCustomization": False
#   "spatialFilter": {
#     "filterType": "mbr",
#     "lowerLeft": {"latitude": 34.0522, "longitude": -118.2437},
#     "upperRight": {"latitude": 34.0522, "longitude": -118.2437}
#   },
#   "temporalFilter": {
#     "startDate": "2024-01-01",
#     "endDate": "2024-12-31"
#   },
#   # "maxResults": 1,
# }
headers = {
  'X-Auth-Token': apiKey
}
# response = requests.post(url, headers=headers, json=params)
# data = response.json()

# print(json.dumps(data, indent=2))

url = serviceUrl + 'scene-search'
params = {
  'datasetName': 'landsat_ot_c2_l2',
  'sceneFilter': {
    "spatialFilter": {
      "filterType": "mbr",
      "lowerLeft": {
        "latitude": 32.656003555872466,
        "longitude": -115.40669953280681
      },
      "upperRight": {
        "latitude": 32.656003555872466,
        "longitude": -115.40669953280681
      }
    },
    "cloudCoverFilter": {
      "max": 100,
      "min": 0,
      "includeUnknown": True
    },
    "acquisitionFilter": {
      "start": "2020-01-01",
      "end": "2024-01-31",
    }
  },
  'metadataType': 'summary',
  'maxResults': 1,
}
response = requests.post(url, headers=headers, json=params)

data = response.json()
print(json.dumps(data, indent=2))

# eId = data['data']['results'][0]['entityId']

# url = serviceUrl + 'scene-metadata'
# params = {
#   'datasetName': 'landsat_ot_c2_l2',
#   'entityId': eId,
#   'metadataType': 'full'
# }

# response = requests.post(url, headers=headers, json=params)
# print(response.json())