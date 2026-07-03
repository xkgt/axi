# MessageReportApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMessageReportReportReportIdGet**](#getmessagereportreportreportidget) | **GET** /report/{report_id} | Get Message Report|
|[**getMessageReportsReportGet**](#getmessagereportsreportget) | **GET** /report | Get Message Reports|
|[**processMessageReportReportReportIdProcessPost**](#processmessagereportreportreportidprocesspost) | **POST** /report/{report_id}/process | Process Message Report|

# **getMessageReportReportReportIdGet**
> MessageReportResponseSchema getMessageReportReportReportIdGet()


### Example

```typescript
import {
    MessageReportApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageReportApi(configuration);

let reportId: number; // (default to undefined)

const { status, data } = await apiInstance.getMessageReportReportReportIdGet(
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**number**] |  | defaults to undefined|


### Return type

**MessageReportResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMessageReportsReportGet**
> MessageReportsResponseSchema getMessageReportsReportGet()


### Example

```typescript
import {
    MessageReportApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageReportApi(configuration);

let skip: number; // (optional) (default to 0)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.getMessageReportsReportGet(
    skip,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skip** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**MessageReportsResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **processMessageReportReportReportIdProcessPost**
> MessageReportResponseSchema processMessageReportReportReportIdProcessPost(messageReportProcessSchema)


### Example

```typescript
import {
    MessageReportApi,
    Configuration,
    MessageReportProcessSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageReportApi(configuration);

let reportId: number; // (default to undefined)
let messageReportProcessSchema: MessageReportProcessSchema; //

const { status, data } = await apiInstance.processMessageReportReportReportIdProcessPost(
    reportId,
    messageReportProcessSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageReportProcessSchema** | **MessageReportProcessSchema**|  | |
| **reportId** | [**number**] |  | defaults to undefined|


### Return type

**MessageReportResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

