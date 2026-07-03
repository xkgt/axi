# ScoresApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**leaderboardScoresLeaderboardGet**](#leaderboardscoresleaderboardget) | **GET** /scores/leaderboard | Leaderboard|
|[**readScoreScoresItemPlayerIdGet**](#readscorescoresitemplayeridget) | **GET** /scores/item/{player_id} | Read Score|
|[**readScoresScoresGet**](#readscoresscoresget) | **GET** /scores | Read Scores|
|[**submitScoreScoresPost**](#submitscorescorespost) | **POST** /scores | Submit Score|

# **leaderboardScoresLeaderboardGet**
> LeaderboardResponse leaderboardScoresLeaderboardGet()


### Example

```typescript
import {
    ScoresApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ScoresApi(configuration);

const { status, data } = await apiInstance.leaderboardScoresLeaderboardGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LeaderboardResponse**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readScoreScoresItemPlayerIdGet**
> ScorePublic readScoreScoresItemPlayerIdGet()


### Example

```typescript
import {
    ScoresApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ScoresApi(configuration);

let playerId: number; // (default to undefined)

const { status, data } = await apiInstance.readScoreScoresItemPlayerIdGet(
    playerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerId** | [**number**] |  | defaults to undefined|


### Return type

**ScorePublic**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readScoresScoresGet**
> Array<ScorePublic> readScoresScoresGet()


### Example

```typescript
import {
    ScoresApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ScoresApi(configuration);

let orderBy: string; //排序字段：high_score 或 last_score_time (optional) (default to 'high_score')
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.readScoresScoresGet(
    orderBy,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **orderBy** | [**string**] | 排序字段：high_score 或 last_score_time | (optional) defaults to 'high_score'|
| **limit** | [**number**] |  | (optional) defaults to 50|


### Return type

**Array<ScorePublic>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **submitScoreScoresPost**
> ScorePublic submitScoreScoresPost(scoreSubmitRequest)


### Example

```typescript
import {
    ScoresApi,
    Configuration,
    ScoreSubmitRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ScoresApi(configuration);

let scoreSubmitRequest: ScoreSubmitRequest; //

const { status, data } = await apiInstance.submitScoreScoresPost(
    scoreSubmitRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **scoreSubmitRequest** | **ScoreSubmitRequest**|  | |


### Return type

**ScorePublic**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

