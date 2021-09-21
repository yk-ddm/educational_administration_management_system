const db = require('./db.js');
const jwt = require('jwt-simple')
const crypto = require('crypto')

exports.login = (req, res) => {
    let info = req.body,
        sql = null,
        data = null,
        _username,
        _realname

    switch (info.identityType) {
        case '1':
            // student
            sql = 'select sno, sname from student where sno = ? and spwd = ? and isdeleted = 0'
            data = [info.username, info.pwd]
            _username = "sno"
            _realname = "sname"
            break
        case '2':
            // teacher
            sql = 'select tno, tname from teacher where tno = ? and tpwd = ? and isdeleted = 0'
            data = [info.username, info.pwd]
            _username = 'tno'
            _realname = 'tname'
            break
        case '3':
            // admin
            sql = 'select mno, mname from manager where mno = ? and mpwd = ? and isdeleted = 0'
            data = [info.username, info.pwd]
            _username = 'mno'
            _realname = 'mname'
            break
        default:
    }

    db.base(sql, data, (results) => {
        if (!results.length) {
            res.json({
                data: {},
                meta: {
                    msg: "用户名或密码错误！",
                    status: 404
                }
            })
        } else {
            const identityType = info.identityType,
                username = results[0][_username],
                realname = results[0][_realname],
                token = makeToken(info.username)

            res.json({
                data: {
                    identityType: identityType,
                    username: username,
                    realname: realname,
                    token: token
                },
                meta: {
                    msg: "登录成功！",
                    status: 200
                }
            })
        }
    })

    /* 生成token*/
    let secret = "yk-ddm",
        tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

    function makeToken(username) {
        let Token = null;
        //需要加密的对象
        let payload = {
            user: username,
            time: new Date().getTime(),
            exp: Date.now() + tokenExpiresTime
        }
        return jwt.encode(payload, secret)
    }
    // console.log(jwt.decode(results[0].token, "yk-ddm"))
}

exports.updatePwd = (req, res) => {
    let info = req.body,
        sql = null,
        data = null

    function encodePwd(targetStr) {
        //加密
        var md5 = crypto.createHash('md5')
        return md5.update(targetStr).digest('base64')
    }

    switch (info.identityType) {
        case '1':
            // student
            sql = 'update student set spwd = ? where sno = ? and spwd = ? and isdeleted = 0'
            data = [encodePwd(info.newPwd), info.username, encodePwd(info.oldPwd)]
            break
        case '2':
            // teacher
            sql = 'update teacher set tpwd = ? where tno = ? and tpwd = ? and isdeleted = 0'
            data = [encodePwd(info.newPwd), info.username, encodePwd(info.oldPwd)]
            break
        case '3':
            // admin
            sql = 'update manager set mpwd = ? where mno = ? and mpwd = ? and isdeleted = 0'
            data = [encodePwd(info.newPwd), info.username, encodePwd(info.oldPwd)]
            break
        default:
    }

    db.base(sql, data, (results) => {
        if (results.affectedRows != 1) {
            res.json({
                data: {},
                meta: {
                    msg: "修改失败！",
                    status: 400
                }
            })
        } else {
            res.json({
                data: {},
                meta: {
                    msg: "修改成功！",
                    status: 200
                }
            })
        }
    })
}

// 注意 ~ 其他密码用的用户名加密
exports.queryProfile = (req, res) => {
    let info = req.query,
        sql = null,
        data = null

    switch (info.identityType) {
        case '1':
            // student
            sql = 'select sno, sname, ssex, smajor, sclass from student where sno = ? and isdeleted = 0'
            data = [info.username]
            break
        case '2':
            // teacher
            sql = 'select tno, tname, tsex, tdept from teacher where tno = ? and isdeleted = 0'
            data = [info.username]
            break
        case '3':
            // admin
            sql = 'select mno, mname from manager where mno = ? and isdeleted = 0'
            data = [info.username]
            break
        default:
    }

    db.base(sql, data, (results) => {
        if (!results.length) {
            res.json({
                data: {},
                meta: {
                    msg: "查询失败！",
                    status: 404
                }
            })
        } else {
            res.json({
                data: results[0],
                meta: {
                    msg: "查询成功！",
                    status: 200
                }
            })
        }
    })
}