# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changePasswordAuthMePasswordPut**](#changepasswordauthmepasswordput) | **PUT** /auth/me/password | Change Password|
|[**deleteMeAuthMeDelete**](#deletemeauthmedelete) | **DELETE** /auth/me | Delete Me|
|[**forgotPasswordAuthForgotPasswordPost**](#forgotpasswordauthforgotpasswordpost) | **POST** /auth/forgot-password | Forgot Password|
|[**getMeAuthMeGet**](#getmeauthmeget) | **GET** /auth/me | Get Me|
|[**loginAuthLoginPost**](#loginauthloginpost) | **POST** /auth/login | Login|
|[**logoutAuthLogoutPost**](#logoutauthlogoutpost) | **POST** /auth/logout | Logout|
|[**refreshAuthRefreshPost**](#refreshauthrefreshpost) | **POST** /auth/refresh | Refresh|
|[**registerAuthRegisterPost**](#registerauthregisterpost) | **POST** /auth/register | Register|
|[**sendCodeAuthSendCodePost**](#sendcodeauthsendcodepost) | **POST** /auth/send-code | Send Code|
|[**updateMeAuthMePatch**](#updatemeauthmepatch) | **PATCH** /auth/me | Update Me|
|[**uploadAvatarAuthMeAvatarPost**](#uploadavatarauthmeavatarpost) | **POST** /auth/me/avatar | Upload Avatar|

# **changePasswordAuthMePasswordPut**
> MessageResponse changePasswordAuthMePasswordPut(changePasswordRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let changePasswordRequest: ChangePasswordRequest; //

const { status, data } = await apiInstance.changePasswordAuthMePasswordPut(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


### Return type

**MessageResponse**

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

# **deleteMeAuthMeDelete**
> MessageResponse deleteMeAuthMeDelete()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.deleteMeAuthMeDelete();
```

### Parameters
This endpoint does not have any parameters.


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **forgotPasswordAuthForgotPasswordPost**
> MessageResponse forgotPasswordAuthForgotPasswordPost(resetPasswordRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ResetPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let resetPasswordRequest: ResetPasswordRequest; //

const { status, data } = await apiInstance.forgotPasswordAuthForgotPasswordPost(
    resetPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequest** | **ResetPasswordRequest**|  | |


### Return type

**MessageResponse**

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

# **getMeAuthMeGet**
> UserPublic getMeAuthMeGet()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.getMeAuthMeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserPublic**

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

# **loginAuthLoginPost**
> TokenResponse loginAuthLoginPost(userLogin)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLogin
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLogin: UserLogin; //

const { status, data } = await apiInstance.loginAuthLoginPost(
    userLogin
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLogin** | **UserLogin**|  | |


### Return type

**TokenResponse**

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

# **logoutAuthLogoutPost**
> MessageResponse logoutAuthLogoutPost(logoutRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LogoutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let logoutRequest: LogoutRequest; //

const { status, data } = await apiInstance.logoutAuthLogoutPost(
    logoutRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **logoutRequest** | **LogoutRequest**|  | |


### Return type

**MessageResponse**

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

# **refreshAuthRefreshPost**
> TokenResponse refreshAuthRefreshPost(refreshRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    RefreshRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let refreshRequest: RefreshRequest; //

const { status, data } = await apiInstance.refreshAuthRefreshPost(
    refreshRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshRequest** | **RefreshRequest**|  | |


### Return type

**TokenResponse**

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

# **registerAuthRegisterPost**
> User registerAuthRegisterPost(userCreate)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userCreate: UserCreate; //

const { status, data } = await apiInstance.registerAuthRegisterPost(
    userCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userCreate** | **UserCreate**|  | |


### Return type

**User**

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

# **sendCodeAuthSendCodePost**
> MessageResponse sendCodeAuthSendCodePost(sendCodeRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SendCodeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let sendCodeRequest: SendCodeRequest; //

const { status, data } = await apiInstance.sendCodeAuthSendCodePost(
    sendCodeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sendCodeRequest** | **SendCodeRequest**|  | |


### Return type

**MessageResponse**

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

# **updateMeAuthMePatch**
> UserPublic updateMeAuthMePatch(userUpdate)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userUpdate: UserUpdate; //

const { status, data } = await apiInstance.updateMeAuthMePatch(
    userUpdate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userUpdate** | **UserUpdate**|  | |


### Return type

**UserPublic**

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

# **uploadAvatarAuthMeAvatarPost**
> UserPublic uploadAvatarAuthMeAvatarPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let file: string; // (default to undefined)

const { status, data } = await apiInstance.uploadAvatarAuthMeAvatarPost(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] |  | defaults to undefined|


### Return type

**UserPublic**

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

