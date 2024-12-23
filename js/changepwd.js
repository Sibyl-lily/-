// 检查登录状态
function checkLogin() {
    const token = localStorage.getItem('token')
    if(!token) {
        alert('请先登录')
        location.href = './login.html'
        return false
    }
    return true
}

// 修改密码
function changePwd() {
    const oldPassword = document.getElementById('oldPassword').value
    const newPassword = document.getElementById('newPassword').value
    const rNewPassword = document.getElementById('rNewPassword').value

    // 表单验证
    if(!oldPassword || !newPassword || !rNewPassword) {
        alert('请填写完整信息')
        return
    }

    // 密码一致性验证
    if(newPassword !== rNewPassword) {
        alert('两次密码输入不一致')
        return
    }

    // 新密码正则验证
    if(!/\w{6,12}/.test(newPassword)) {
        alert('新密码格式不正确')
        return
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const data = {
        id: userInfo.id,
        oldPassword,
        newPassword,
        rNewPassword
    }

    axios.post('http://localhost:8888/users/rpwd', data, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
    .then(res => {
        if(res.data.code === 1) {
            alert('修改成功，请重新登录')
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            location.href = './login.html'
        } else {
            alert(res.data.message)
        }
    })
    .catch(err => {
        if(err.response?.status === 401) {
            alert('登录已过期，请重新登录')
            location.href = './login.html'
        } else {
            alert('修改失败')
        }
    })
}

// 页面加载完成
window.onload = checkLogin 