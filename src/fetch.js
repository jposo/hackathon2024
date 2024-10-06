const serviceUrl = 'https://m2m.cr.usgs.gov/api/api/json/stable/';

export async function login() {
  const loginUrl = serviceUrl + 'login-token';

  let payload = {
    username: 'jposo',
    token: 'QHWfLl4s5!!SU83elzPco_4@kByJ__bCS6JPIXTi4Yh38m8OQh7lkUlyqhMxskQ9'
  };
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  const response = await fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
    mode: 'cors',
  });
  const data = await response.json();
  return data.data;
};

const getEntityId = async (apiKey, coord) => {
  const url = serviceUrl + 'scene-search'
  const headers = {
    'X-Auth-Token': apiKey
  }
  const params = {
    datasetName: 'landsat_ot_c2_l2',
    sceneFilter: {
      spatialFilter: {
        filterType: "mbr",
        lowerLeft: {
          latitude: coord[0],
          longitude: coord[1]
        },
        upperRight: {
          latitude: coord[0],
          longitude: coord[1]
        }
      },
      cloudCoverFilter: {
        max: 100,
        min: 0,
        includeUnknown: true
      },
      acquisitionFilter: {
        start: "2020-01-01",
        end: "2024-01-31",
      }
    },
    metadataType: 'summary',
    maxResults: 1,
  }
  const response = await fetch (url, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: params,
  });
  const data = response.json();
  return data.data.results[0].entityId;
};

export async function getScenePaths(apiKey, coord) {
  const url = 'https://cors-anywhere.herokuapp.com/' + serviceUrl + 'scene-search'
  const headers = {
    'X-Auth-Token': apiKey,
    'Content-Type': 'application/json'
  }
  const params = {
    datasetName: 'landsat_ot_c2_l2',
    sceneFilter: {
      spatialFilter: {
        filterType: "mbr",
        lowerLeft: {
          latitude: coord[0],
          longitude: coord[1]
        },
        upperRight: {
          latitude: coord[0],
          longitude: coord[1]
        }
      },
      cloudCoverFilter: {
        max: 100,
        min: 0,
        includeUnknown: true
      },
      acquisitionFilter: {
        start: "2020-01-01",
        end: "2024-01-31",
      }
    },
    metadataType: 'summary',
    maxResults: 1,
  }
  const response = await fetch (url, {
    method: 'POST',
    mode: 'cors',
    headers,
    body: params,
  });
  const data = await response.json();
  return data.data.results[0].spatialBounds.coordinates;
};