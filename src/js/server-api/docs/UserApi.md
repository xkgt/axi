# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserUserPost**](#createuseruserpost) | **POST** /user/ | Create User|
|[**deleteUserUserUserIdDelete**](#deleteuseruseruseriddelete) | **DELETE** /user/{user_id} | Delete User|
|[**getCurrentUserRouteUserGet**](#getcurrentuserrouteuserget) | **GET** /user/ | Get Current User Route|
|[**getUserUserUserIdGet**](#getuseruseruseridget) | **GET** /user/{user_id} | Get User|
|[**loginUserUserLoginPost**](#loginuseruserloginpost) | **POST** /user/login | Login User|
|[**resetPasswordUserPasswordPost**](#resetpassworduserpasswordpost) | **POST** /user/password | Reset Password|
|[**updateAvatarUserAvatarPut**](#updateavataruseravatarput) | **PUT** /user/avatar | Update Avatar|
|[**updateUserUserUserIdPatch**](#updateuseruseruseridpatch) | **PATCH** /user/{user_id} | Update User|

# **createUserUserPost**
> UserWithTokenResponseSchema createUserUserPost(userCreateSchema)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UserCreateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userCreateSchema: UserCreateSchema; //

const { status, data } = await apiInstance.createUserUserPost(
    userCreateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userCreateSchema** | **UserCreateSchema**|  | |


### Return type

**UserWithTokenResponseSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUserUserUserIdDelete**
> deleteUserUserUserIdDelete()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUserUserUserIdDelete(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


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

# **getCurrentUserRouteUserGet**
> UserResponseSchema getCurrentUserRouteUserGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.getCurrentUserRouteUserGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserUserUserIdGet**
> UserResponseSchema getUserUserUserIdGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getUserUserUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**UserResponseSchema**

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

# **loginUserUserLoginPost**
> any loginUserUserLoginPost(userLoginSchema)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UserLoginSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userLoginSchema: UserLoginSchema; //

const { status, data } = await apiInstance.loginUserUserLoginPost(
    userLoginSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLoginSchema** | **UserLoginSchema**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resetPasswordUserPasswordPost**
> any resetPasswordUserPasswordPost(userResetPasswordSchema)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UserResetPasswordSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userResetPasswordSchema: UserResetPasswordSchema; //

const { status, data } = await apiInstance.resetPasswordUserPasswordPost(
    userResetPasswordSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userResetPasswordSchema** | **UserResetPasswordSchema**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAvatarUserAvatarPut**
> UserResponseSchema updateAvatarUserAvatarPut()

Ҫ��ͼƬΪpng��ʽ��1��1�ߴ磬������30~1000�����ڣ����ظ��ĺ���û�

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let avatar: File; // (default to undefined)

const { status, data } = await apiInstance.updateAvatarUserAvatarPut(
    avatar
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **avatar** | [**File**] |  | defaults to undefined|


### Return type

**UserResponseSchema**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateUserUserUserIdPatch**
> UserResponseSchema updateUserUserUserIdPatch(userUpdateSchema)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UserUpdateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: number; // (default to undefined)
let userUpdateSchema: UserUpdateSchema; //

const { status, data } = await apiInstance.updateUserUserUserIdPatch(
    userId,
    userUpdateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userUpdateSchema** | **UserUpdateSchema**|  | |
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**UserResponseSchema**

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

