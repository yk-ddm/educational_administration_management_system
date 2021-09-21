# back_end_API

> 接口根地址：`http://127.0.0.1:3000/api/`



> 使用 Token 认证，通过 `Authorization` 字段提供 `token` 令牌



> 通过 HTTP Status Code 标识状态，数据返回格式统一使用 JSON



## 登录接口

- 请求路径：`http://127.0.0.1:3000/api/login`
- 请求方法：`POST`
- 请求参数详情如下表：

| 参数名       | 参数描述                              | 是否必选 | 参数类型 | 示例           |
| ------------ | ------------------------------------- | -------- | -------- | -------------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） | 是       | string   | "1"            |
| username     | 用户名                                | 是       | string   | "020321752224" |
| pwd          | 密码                                  | 是       | string   | "yk-ddm"       |

- 响应参数详情如下表：

| 参数名       | 参数描述                              |
| ------------ | ------------------------------------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） |
| username     | 用户名                                |
| realname     | 真实姓名                              |
| token        | 令牌                                  |

> 响应成功的数据

```json
{
  "data": {
    "identityType": "1",
    "username": "020321752224",
    "realname": "杨侃",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDIwMzIxNzUyMjI0IiwidGltZSI6MTYzMjIwMjM2NDY4NCwiZXhwIjoxNjMyODA3MTY0Njg0fQ.N1XVUxmavoNl6qsIMa_rqrsDv-SZjUI3i2GX36Infew"
  },
  "meta": {
    "msg": "登录成功！",
    "status": 200
  }
}
```

> 响应失败的数据

```json
{
  "data": {},
  "meta": {
    "msg": "用户名或密码错误！",
    "status": 404
  }
}
```

## 修改密码接口

- 请求路径：`http://127.0.0.1:3000/api/updatePwd`
- 请求方法：`POST`
- 请求参数详情如下表：

| 参数名       | 参数描述                              | 是否必选 | 参数类型 |
| ------------ | ------------------------------------- | -------- | -------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） | 是       | string   |
| username     | 用户名                                | 是       | string   |
| oldPwd       | 旧密码                                | 是       | string   |
| newPwd       | 新密码                                | 是       | string   |

- 响应参数详情如下表：

| 参数名 | 参数描述       |
| ------ | -------------- |
| msg    | 返回的结果消息 |

> 响应成功的数据

```json
{
  "data": {},
  "meta": {
    "msg": "修改成功！",
    "status": 201
  }
}
```

> 响应失败的数据

```json
{
  "data": {},
  "meta": {
    "msg": "修改失败！",
    "status": 400
  }
}
```

## 查询个人信息接口

- 请求路径：`http://127.0.0.1:3000/api/queryProfile`
- 请求方法：`GET`
- 请求参数详情如下表：

| 参数名       | 参数描述                              | 是否必选 | 参数类型 |
| ------------ | ------------------------------------- | -------- | -------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） | 是       | string   |
| username     | 用户名                                | 是       | string   |

- 当 `identityType = 1` 时，响应参数详情如下表：

| 参数名 | 参数描述 |
| ------ | -------- |
| sno    | 学号     |
| sname  | 姓名     |
| ssex   | 性别     |
| smajor | 专业     |
| sclass | 所在班级 |

> 响应成功的数据

```json
{
  "data": {
    "sno": "020321752224",
    "sname": "杨侃",
    "ssex": 1,
    "smajor": "软件工程",
    "sclass": "0203217522"
  },
  "meta": {
    "msg": "查询成功！",
    "status": 200
  }
}
```
- 当 `identityType = 2` 时，响应参数详情如下表：

| 参数名 | 参数描述 |
| ------ | -------- |
| tno    | 教师号   |
| tname  | 姓名     |
| tsex   | 性别     |
| tdept  | 所在院系 |

> 响应成功的数据

```json
{
  "data": {
    "tno": "01",
    "tname": "张三",
    "tsex": 1,
    "tdept": "计算机学院"
  },
  "meta": {
    "msg": "查询成功！",
    "status": 200
  }
}
```
- 当 `identityType = 3` 时，响应参数详情如下表：

| 参数名 | 参数描述   |
| ------ | ---------- |
| mno    | 管理员编号 |
| mname  | 姓名       |

> 响应成功的数据

```json
{
  "data": {
    "mno": "0002",
    "mname": "root"
  },
  "meta": {
    "msg": "查询成功！",
    "status": 200
  }
}
```

> 响应失败的数据

```json
{
  "data": {},
  "meta": {
    "msg": "查询失败！",
    "status": 404
  }
}
```

## 学生课表查询接口

- 请求路径：`http://127.0.0.1:3000/api/login`
- 请求方法：`POST`
- 请求参数详情如下表：

| 参数名       | 参数描述                              | 是否必选 | 参数类型 |
| ------------ | ------------------------------------- | -------- | -------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） | 是       | string   |
| username     | 用户名                                | 是       | string   |
| pwd          | 密码                                  | 是       | string   |

- 响应参数详情如下表：

| 参数名       | 参数描述                              |
| ------------ | ------------------------------------- |
| identityType | 身份类型（1: 学生/2: 教师/3: 管理员） |
| username     | 用户名                                |
| realname     | 真实姓名                              |
| token        | 令牌                                  |

> 响应成功的数据

```json
{
  "data": {
    "identityType": "1",
    "username": "020321752224",
    "realname": "杨侃",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMDIwMzIxNzUyMjI0IiwidGltZSI6MTYzMjE5NzgzOTY2OCwiZXhwIjoxNjMyODAyNjM5NjY5fQ.pc9xDdXA_Ly3E85QdtKyj0XIleANR-i-C0UH-V4ht7g"
  },
  "meta": {
    "msg": "查询成功！",
    "status": 200
  }
}
```

> 响应失败的数据

```json
{
  "data": {},
  "meta": {
    "msg": "查询失败！",
    "status": 404
  }
}
```