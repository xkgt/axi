# MessageApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createMessageMessageCreatePost**](#createmessagemessagecreatepost) | **POST** /message/create | Create Message|
|[**deleteMessageMessageMessageIdDelete**](#deletemessagemessagemessageiddelete) | **DELETE** /message/{message_id} | Delete Message|
|[**likeMessageMessageMessageIdLikesPost**](#likemessagemessagemessageidlikespost) | **POST** /message/{message_id}/likes | Like Message|
|[**readMessageMessageMessageIdGet**](#readmessagemessagemessageidget) | **GET** /message/{message_id} | Read Message|
|[**readMessagesMessageGet**](#readmessagesmessageget) | **GET** /message/ | Read Messages|
|[**reportMessageMessageMessageIdReportPost**](#reportmessagemessagemessageidreportpost) | **POST** /message/{message_id}/report | Report Message|
|[**unlikeMessageMessageMessageIdLikesDelete**](#unlikemessagemessagemessageidlikesdelete) | **DELETE** /message/{message_id}/likes | Unlike Message|
|[**updateMessageMessageMessageIdPatch**](#updatemessagemessagemessageidpatch) | **PATCH** /message/{message_id} | Update Message|

# **createMessageMessageCreatePost**
> MessageResponseSchema createMessageMessageCreatePost(messageCreateSchema)


### Example

```typescript
import {
    MessageApi,
    Configuration,
    MessageCreateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageCreateSchema: MessageCreateSchema; //

const { status, data } = await apiInstance.createMessageMessageCreatePost(
    messageCreateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageCreateSchema** | **MessageCreateSchema**|  | |


### Return type

**MessageResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteMessageMessageMessageIdDelete**
> deleteMessageMessageMessageIdDelete()


### Example

```typescript
import {
    MessageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteMessageMessageMessageIdDelete(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **likeMessageMessageMessageIdLikesPost**
> any likeMessageMessageMessageIdLikesPost()


### Example

```typescript
import {
    MessageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.likeMessageMessageMessageIdLikesPost(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**any**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readMessageMessageMessageIdGet**
> MessageResponseSchema readMessageMessageMessageIdGet()


### Example

```typescript
import {
    MessageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.readMessageMessageMessageIdGet(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessageResponseSchema**

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

# **readMessagesMessageGet**
> MessagesResponseSchema readMessagesMessageGet()


### Example

```typescript
import {
    MessageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let skip: number; // (optional) (default to 0)
let limit: number; // (optional) (default to undefined)
let sinceTime: string; // (optional) (default to undefined)
let beforeTime: string; // (optional) (default to undefined)
let accordMessageId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.readMessagesMessageGet(
    skip,
    limit,
    sinceTime,
    beforeTime,
    accordMessageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skip** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **sinceTime** | [**string**] |  | (optional) defaults to undefined|
| **beforeTime** | [**string**] |  | (optional) defaults to undefined|
| **accordMessageId** | [**number**] |  | (optional) defaults to undefined|


### Return type

**MessagesResponseSchema**

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

# **reportMessageMessageMessageIdReportPost**
> MessageReportResponseSchema reportMessageMessageMessageIdReportPost(messageReportCreateSchema)


### Example

```typescript
import {
    MessageApi,
    Configuration,
    MessageReportCreateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)
let messageReportCreateSchema: MessageReportCreateSchema; //

const { status, data } = await apiInstance.reportMessageMessageMessageIdReportPost(
    messageId,
    messageReportCreateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageReportCreateSchema** | **MessageReportCreateSchema**|  | |
| **messageId** | [**number**] |  | defaults to undefined|


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
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **unlikeMessageMessageMessageIdLikesDelete**
> unlikeMessageMessageMessageIdLikesDelete()


### Example

```typescript
import {
    MessageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.unlikeMessageMessageMessageIdLikesDelete(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateMessageMessageMessageIdPatch**
> any updateMessageMessageMessageIdPatch(messageUpdateSchema)


### Example

```typescript
import {
    MessageApi,
    Configuration,
    MessageUpdateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new MessageApi(configuration);

let messageId: number; // (default to undefined)
let messageUpdateSchema: MessageUpdateSchema; //

const { status, data } = await apiInstance.updateMessageMessageMessageIdPatch(
    messageId,
    messageUpdateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageUpdateSchema** | **MessageUpdateSchema**|  | |
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**any**

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

