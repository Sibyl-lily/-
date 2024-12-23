function login(event) {
    // 阻止表单默认提交行为
    event.preventDefault()
    
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // 表单验证
    if(!username || !password) {
        alert('请填写完整信息')
        return false
    }

    // 发送登录请求
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)

    axios.post('http://localhost:8888/users/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => {
        if(res.data.code === 1) {
            // 保存token和用户信息
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data.user))
            alert('登录成功')
            location.href = 'index.html'
        } else {
            alert(res.data.message)
        }
    })
    .catch(err => {
        alert('登录失败')
    })

    return false
} 