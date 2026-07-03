# BarragesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**bilibiliDanmakuBarragesBilibiliGet**](#bilibilidanmakubarragesbilibiliget) | **GET** /barrages/bilibili | Bilibili Danmaku|
|[**createBarragesPost**](#createbarragespost) | **POST** /barrages | Create|
|[**deleteBarragesItemBarrageIdDelete**](#deletebarragesitembarrageiddelete) | **DELETE** /barrages/item/{barrage_id} | Delete|
|[**readBarrageBarragesItemBarrageIdGet**](#readbarragebarragesitembarrageidget) | **GET** /barrages/item/{barrage_id} | Read Barrage|
|[**readBarragesBarragesGet**](#readbarragesbarragesget) | **GET** /barrages | Read Barrages|

# **bilibiliDanmakuBarragesBilibiliGet**
> BilibiliDanmakuResponse bilibiliDanmakuBarragesBilibiliGet()


### Example

```typescript
import {
    BarragesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BarragesApi(configuration);

let bvid: string; // (default to undefined)

const { status, data } = await apiInstance.bilibiliDanmakuBarragesBilibiliGet(
    bvid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bvid** | [**string**] |  | defaults to undefined|


### Return type

**BilibiliDanmakuResponse**

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

# **createBarragesPost**
> BarragePublic createBarragesPost(barrageCreate)


### Example

```typescript
import {
    BarragesApi,
    Configuration,
    BarrageCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new BarragesApi(configuration);

let barrageCreate: BarrageCreate; //

const { status, data } = await apiInstance.createBarragesPost(
    barrageCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **barrageCreate** | **BarrageCreate**|  | |


### Return type

**BarragePublic**

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

# **deleteBarragesItemBarrageIdDelete**
> deleteBarragesItemBarrageIdDelete()


### Example

```typescript
import {
    BarragesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BarragesApi(configuration);

let barrageId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteBarragesItemBarrageIdDelete(
    barrageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **barrageId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readBarrageBarragesItemBarrageIdGet**
> BarragePublic readBarrageBarragesItemBarrageIdGet()


### Example

```typescript
import {
    BarragesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BarragesApi(configuration);

let barrageId: number; // (default to undefined)

const { status, data } = await apiInstance.readBarrageBarragesItemBarrageIdGet(
    barrageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **barrageId** | [**number**] |  | defaults to undefined|


### Return type

**BarragePublic**

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

# **readBarragesBarragesGet**
> Array<BarragePublic> readBarragesBarragesGet()


### Example

```typescript
import {
    BarragesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BarragesApi(configuration);

let cursor: string; //上一页最后一条的 created_at (optional) (default to undefined)
let startDate: string; //起始时间 (optional) (default to undefined)
let endDate: string; //结束时间 (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.readBarragesBarragesGet(
    cursor,
    startDate,
    endDate,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cursor** | [**string**] | 上一页最后一条的 created_at | (optional) defaults to undefined|
| **startDate** | [**string**] | 起始时间 | (optional) defaults to undefined|
| **endDate** | [**string**] | 结束时间 | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|


### Return type

**Array<BarragePublic>**

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

