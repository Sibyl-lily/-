function register() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const rpassword = document.getElementById('rpassword').value
    const nickname = document.getElementById('nickname').value

    // 表单验证
    if(!username || !password || !rpassword || !nickname) {
        alert('请填写完整信息')
        return
    }

    // 密码一致性验证
    if(password !== rpassword) {
        alert('两次密码输入不一致')
        return
    }

    // 用户名正则验证 /^[a-z0-9]\w{3,11}$/
    if(!/^[a-z0-9]\w{3,11}$/.test(username)) {
        alert('用户名格式不正确')
        return
    }

    // 密码正则验证 /\w{6,12}/
    if(!/\w{6,12}/.test(password)) {
        alert('密码格式不正确')
        return
    }

    // 发送注册请求
    axios.post('http://localhost:8888/users/register', {
        username,
        password,
        rpassword,
        nickname
    })
    .then(res => {
        if(res.data.code === 1) {
            alert('注册成功')
            location.href = './login.html'
        } else {
            alert(res.data.message)
        }
    })
    .catch(err => {
        alert('注册失败')
    })
} 