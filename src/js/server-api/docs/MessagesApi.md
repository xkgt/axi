# MessagesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCommentHandlerMessagesItemMessageIdCommentsPost**](#createcommenthandlermessagesitemmessageidcommentspost) | **POST** /messages/item/{message_id}/comments | Create Comment Handler|
|[**createMessageMessagesPost**](#createmessagemessagespost) | **POST** /messages | Create Message|
|[**deleteCommentMessagesItemMessageIdCommentsItemCommentIdDelete**](#deletecommentmessagesitemmessageidcommentsitemcommentiddelete) | **DELETE** /messages/item/{message_id}/comments/item/{comment_id} | Delete Comment|
|[**deleteMessageMessagesItemMessageIdDelete**](#deletemessagemessagesitemmessageiddelete) | **DELETE** /messages/item/{message_id} | Delete Message|
|[**dislikeMsgMessagesItemMessageIdDislikePost**](#dislikemsgmessagesitemmessageiddislikepost) | **POST** /messages/item/{message_id}/dislike | Dislike Msg|
|[**getBarrageTextsMessagesBarrageTextsGet**](#getbarragetextsmessagesbarragetextsget) | **GET** /messages/barrage-texts | Get Barrage Texts|
|[**getMessageMessagesItemMessageIdGet**](#getmessagemessagesitemmessageidget) | **GET** /messages/item/{message_id} | Get Message|
|[**likeMessageMessagesItemMessageIdLikePost**](#likemessagemessagesitemmessageidlikepost) | **POST** /messages/item/{message_id}/like | Like Message|
|[**listCommentsMessagesItemMessageIdCommentsGet**](#listcommentsmessagesitemmessageidcommentsget) | **GET** /messages/item/{message_id}/comments | List Comments|
|[**listMessagesMessagesGet**](#listmessagesmessagesget) | **GET** /messages | List Messages|
|[**reportMessageMessagesItemMessageIdReportPost**](#reportmessagemessagesitemmessageidreportpost) | **POST** /messages/item/{message_id}/report | Report Message|
|[**undislikeMsgMessagesItemMessageIdDislikeDelete**](#undislikemsgmessagesitemmessageiddislikedelete) | **DELETE** /messages/item/{message_id}/dislike | Undislike Msg|
|[**unlikeMessageMessagesItemMessageIdLikeDelete**](#unlikemessagemessagesitemmessageidlikedelete) | **DELETE** /messages/item/{message_id}/like | Unlike Message|
|[**updateMessageMessagesItemMessageIdPatch**](#updatemessagemessagesitemmessageidpatch) | **PATCH** /messages/item/{message_id} | Update Message|

# **createCommentHandlerMessagesItemMessageIdCommentsPost**
> CommentPublic createCommentHandlerMessagesItemMessageIdCommentsPost(commentCreate)


### Example

```typescript
import {
    MessagesApi,
    Configuration,
    CommentCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)
let commentCreate: CommentCreate; //

const { status, data } = await apiInstance.createCommentHandlerMessagesItemMessageIdCommentsPost(
    messageId,
    commentCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentCreate** | **CommentCreate**|  | |
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**CommentPublic**

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

# **createMessageMessagesPost**
> MessagePublic createMessageMessagesPost()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let content: string; // (default to undefined)
let images: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.createMessageMessagesPost(
    content,
    images
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **content** | [**string**] |  | defaults to undefined|
| **images** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**MessagePublic**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteCommentMessagesItemMessageIdCommentsItemCommentIdDelete**
> deleteCommentMessagesItemMessageIdCommentsItemCommentIdDelete()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)
let commentId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteCommentMessagesItemMessageIdCommentsItemCommentIdDelete(
    messageId,
    commentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|
| **commentId** | [**number**] |  | defaults to undefined|


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

# **deleteMessageMessagesItemMessageIdDelete**
> deleteMessageMessagesItemMessageIdDelete()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteMessageMessagesItemMessageIdDelete(
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

# **dislikeMsgMessagesItemMessageIdDislikePost**
> MessageResponse dislikeMsgMessagesItemMessageIdDislikePost()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.dislikeMsgMessagesItemMessageIdDislikePost(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessageResponse**

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

# **getBarrageTextsMessagesBarrageTextsGet**
> Array<BarrageTextItem> getBarrageTextsMessagesBarrageTextsGet()

获取留言内容作为弹幕游戏的弹幕源。

### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let limit: number; // (optional) (default to 100)

const { status, data } = await apiInstance.getBarrageTextsMessagesBarrageTextsGet(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 100|


### Return type

**Array<BarrageTextItem>**

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

# **getMessageMessagesItemMessageIdGet**
> MessagePublic getMessageMessagesItemMessageIdGet()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.getMessageMessagesItemMessageIdGet(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessagePublic**

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

# **likeMessageMessagesItemMessageIdLikePost**
> MessageResponse likeMessageMessagesItemMessageIdLikePost()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.likeMessageMessagesItemMessageIdLikePost(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessageResponse**

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

# **listCommentsMessagesItemMessageIdCommentsGet**
> Array<CommentPublic> listCommentsMessagesItemMessageIdCommentsGet()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)
let cursor: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.listCommentsMessagesItemMessageIdCommentsGet(
    messageId,
    cursor,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|
| **cursor** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 50|


### Return type

**Array<CommentPublic>**

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

# **listMessagesMessagesGet**
> Array<MessagePublic> listMessagesMessagesGet()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let afterTime: string; // (optional) (default to undefined)
let beforeTime: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 20)
let accordMessageId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.listMessagesMessagesGet(
    afterTime,
    beforeTime,
    limit,
    accordMessageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **afterTime** | [**string**] |  | (optional) defaults to undefined|
| **beforeTime** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 20|
| **accordMessageId** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<MessagePublic>**

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

# **reportMessageMessagesItemMessageIdReportPost**
> ReportPublic reportMessageMessagesItemMessageIdReportPost(reportCreate)


### Example

```typescript
import {
    MessagesApi,
    Configuration,
    ReportCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)
let reportCreate: ReportCreate; //

const { status, data } = await apiInstance.reportMessageMessagesItemMessageIdReportPost(
    messageId,
    reportCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportCreate** | **ReportCreate**|  | |
| **messageId** | [**number**] |  | defaults to undefined|


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

# **undislikeMsgMessagesItemMessageIdDislikeDelete**
> MessageResponse undislikeMsgMessagesItemMessageIdDislikeDelete()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.undislikeMsgMessagesItemMessageIdDislikeDelete(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessageResponse**

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

# **unlikeMessageMessagesItemMessageIdLikeDelete**
> MessageResponse unlikeMessageMessagesItemMessageIdLikeDelete()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)

const { status, data } = await apiInstance.unlikeMessageMessagesItemMessageIdLikeDelete(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessageResponse**

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

# **updateMessageMessagesItemMessageIdPatch**
> MessagePublic updateMessageMessagesItemMessageIdPatch(messageCreate)


### Example

```typescript
import {
    MessagesApi,
    Configuration,
    MessageCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let messageId: number; // (default to undefined)
let messageCreate: MessageCreate; //

const { status, data } = await apiInstance.updateMessageMessagesItemMessageIdPatch(
    messageId,
    messageCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageCreate** | **MessageCreate**|  | |
| **messageId** | [**number**] |  | defaults to undefined|


### Return type

**MessagePublic**

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

