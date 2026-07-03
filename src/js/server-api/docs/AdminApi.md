# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**banUserAdminUsersUserIdBanPut**](#banuseradminusersuseridbanput) | **PUT** /admin/users/{user_id}/ban | Ban User|
|[**dashboardAdminDashboardGet**](#dashboardadmindashboardget) | **GET** /admin/dashboard | Dashboard|
|[**deleteBarrageAdminAdminBarragesItemBarrageIdDelete**](#deletebarrageadminadminbarragesitembarrageiddelete) | **DELETE** /admin/barrages/item/{barrage_id} | Delete Barrage Admin|
|[**hotReloadFrontendAdminHotReloadPost**](#hotreloadfrontendadminhotreloadpost) | **POST** /admin/hot-reload | Hot Reload Frontend|
|[**listBarragesAdminAdminBarragesGet**](#listbarragesadminadminbarragesget) | **GET** /admin/barrages | List Barrages Admin|
|[**listMessagesAdminAdminMessagesGet**](#listmessagesadminadminmessagesget) | **GET** /admin/messages | List Messages Admin|
|[**listUsersAdminUsersGet**](#listusersadminusersget) | **GET** /admin/users | List Users|
|[**rollbackHotReloadAdminHotReloadRollbackPost**](#rollbackhotreloadadminhotreloadrollbackpost) | **POST** /admin/hot-reload/rollback | Rollback Hot Reload|
|[**unbanUserAdminUsersUserIdUnbanPut**](#unbanuseradminusersuseridunbanput) | **PUT** /admin/users/{user_id}/unban | Unban User|

# **banUserAdminUsersUserIdBanPut**
> BanToggleResponse banUserAdminUsersUserIdBanPut()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.banUserAdminUsersUserIdBanPut(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**BanToggleResponse**

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

# **dashboardAdminDashboardGet**
> DashboardResponse dashboardAdminDashboardGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.dashboardAdminDashboardGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DashboardResponse**

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

# **deleteBarrageAdminAdminBarragesItemBarrageIdDelete**
> deleteBarrageAdminAdminBarragesItemBarrageIdDelete()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let barrageId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteBarrageAdminAdminBarragesItemBarrageIdDelete(
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

# **hotReloadFrontendAdminHotReloadPost**
> { [key: string]: any; } hotReloadFrontendAdminHotReloadPost()

热更新前端：上传 zip 压缩包并覆盖 FRONTEND_DIST 目录。

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let file: string; //前端构建产物 zip 文件 (default to undefined)

const { status, data } = await apiInstance.hotReloadFrontendAdminHotReloadPost(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] | 前端构建产物 zip 文件 | defaults to undefined|


### Return type

**{ [key: string]: any; }**

### Authorization

[HTTPBearer](../README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listBarragesAdminAdminBarragesGet**
> Array<BarragePublic> listBarragesAdminAdminBarragesGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let cursor: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.listBarragesAdminAdminBarragesGet(
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

**Array<BarragePublic>**

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

# **listMessagesAdminAdminMessagesGet**
> Array<AdminMessageItem> listMessagesAdminAdminMessagesGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let cursor: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.listMessagesAdminAdminMessagesGet(
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

**Array<AdminMessageItem>**

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

# **listUsersAdminUsersGet**
> Array<UserPublic> listUsersAdminUsersGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let cursor: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to 50)

const { status, data } = await apiInstance.listUsersAdminUsersGet(
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

**Array<UserPublic>**

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

# **rollbackHotReloadAdminHotReloadRollbackPost**
> { [key: string]: any; } rollbackHotReloadAdminHotReloadRollbackPost()

回滚到热更新前的版本。

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.rollbackHotReloadAdminHotReloadRollbackPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: any; }**

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

# **unbanUserAdminUsersUserIdUnbanPut**
> BanToggleResponse unbanUserAdminUsersUserIdUnbanPut()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.unbanUserAdminUsersUserIdUnbanPut(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**BanToggleResponse**

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

