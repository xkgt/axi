# ReportsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getReportReportsReportIdGet**](#getreportreportsreportidget) | **GET** /reports/{report_id} | Get Report|
|[**listReportsReportsGet**](#listreportsreportsget) | **GET** /reports | List Reports|
|[**processReportReportsReportIdProcessPost**](#processreportreportsreportidprocesspost) | **POST** /reports/{report_id}/process | Process Report|

# **getReportReportsReportIdGet**
> ReportPublic getReportReportsReportIdGet()


### Example

```typescript
import {
    ReportsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let reportId: number; // (default to undefined)

const { status, data } = await apiInstance.getReportReportsReportIdGet(
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**number**] |  | defaults to undefined|


### Return type

**ReportPublic**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listReportsReportsGet**
> Array<ReportPublic> listReportsReportsGet()


### Example

```typescript
import {
    ReportsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let cursor: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.listReportsReportsGet(
    cursor,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cursor** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|


### Return type

**Array<ReportPublic>**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **processReportReportsReportIdProcessPost**
> ReportPublic processReportReportsReportIdProcessPost(reportProcessRequest)


### Example

```typescript
import {
    ReportsApi,
    Configuration,
    ReportProcessRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportsApi(configuration);

let reportId: number; // (default to undefined)
let reportProcessRequest: ReportProcessRequest; //

const { status, data } = await apiInstance.processReportReportsReportIdProcessPost(
    reportId,
    reportProcessRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportProcessRequest** | **ReportProcessRequest**|  | |
| **reportId** | [**number**] |  | defaults to undefined|


### Return type

**ReportPublic**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

