const increase_button = document.getElementById("increase")
const decrease_button = document.getElementById("decrease")
const reset_button = document.getElementById("reset")
const root = document.documentElement

let init_color;
let curr_color
window.onload = () => {
    console.log('window onload 事件触发')
    init_color = getComputedStyle(document.body).getPropertyValue("--color")
    curr_color = init_color
    console.log(`初始化时的色彩是: ${init_color}`)
}

increase_button.addEventListener('click', (e) => {
    console.log("Click `increase`")
    increase()
})
increase_button.addEventListener('touchstart', increase)


decrease_button.addEventListener('click', function() {
    console.log("Click `decrease`")
    decrease()
})
decrease_button.addEventListener('touchstart', decrease)

reset_button.addEventListener('click', () => {
    console.log("Click `reset`")
    reset()
})
reset_button.addEventListener('touchstart', reset)
// 使用了函数默认值
function increase(change = 10) {
    curr_color = setHue(curr_color, change)
    root.style.setProperty("--color", curr_color)
}
function decrease(change = -10) {
    curr_color = setHue(curr_color, change)
    root.style.setProperty("--color", curr_color)
}
function reset() {
    curr_color = init_color
    root.style.setProperty("--color", curr_color)

}
// TODO: 使用build模式重新设计
function setHue(curr_color, change) {
    curr_color = curr_color.trim()
    if (!curr_color.startsWith("hsl")) {
        throw new Error("这不是一个hsl颜色")
    }
    let hue 
    // TODO: 重构为匹配括号内内容然后用对象存储
    hue = curr_color.match(/(?<=\().+?(?=,)/)[0]
    // 为什么我们要在这里判断change是不是数字呢
    if (change !== parseInt(change)) {
        // TODO: 在手机上会报错，原因不明
        throw new Error('change值不是整数')
    }
    // TODO: 使用以前的颜色，而不是魔法值
    curr_color =  `hsl(${+hue + change}, 47%, 37%)`
    return curr_color
}