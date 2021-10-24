function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)


    // отримання контексту для малювання
    const context = canvas.getContext('2d')
    context.fillText(new Date().toString(), 350, 10)
    // отримуємо координати canvas відносно viewport
    const rect = canvas.getBoundingClientRect();
    let isPaint = false // чи активно малювання
    let points = [] //масив з точками

    // об’являємо функцію додавання точок в масив
    const addPoint = (x, y, dragging) => {
        // преобразуємо координати події кліка миші відносно canvas
        points.push({
            x: (x - rect.left),
            y: (y - rect.top),
            dragging: dragging
        })
    }

    // головна функція для малювання
    const redraw = () => {
        //очищуємо  canvas

        context.strokeStyle = options.strokeColor;
        context.lineJoin = "round";
        context.lineWidth = options.strokeWidth;
        let prevPoint = null;
        for (let point of points){
            context.beginPath();
            if (point.dragging && prevPoint){
                context.moveTo(prevPoint.x, prevPoint.y)
            } else {
                context.moveTo(point.x - 1, point.y);
            }
            context.lineTo(point.x, point.y)
            context.closePath()
            context.stroke();
            prevPoint = point;
        }
    }

    // функції обробники подій миші
    const mouseDown = event => {
        isPaint = true
        addPoint(event.pageX, event.pageY);
        redraw();
    }

    const mouseMove = event => {
        if(isPaint){
            addPoint(event.pageX, event.pageY, true);
            redraw();
        }
    }

// додаємо обробку подій
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
        isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
        isPaint = false;
    });

    const toolBarClear = document.getElementById('toolbar')
    const clearBtn = document.createElement('button')
    clearBtn.classList.add('btn')
    let iconClear = document.createElement('i')
    iconClear.classList.add('fas')
    iconClear.classList.add('fa-chalkboard')
    clearBtn.appendChild(iconClear)

    clearBtn.addEventListener('click', () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        points.length = 0
    })
    toolBarClear.insertAdjacentElement('afterbegin', clearBtn)

    const toolBarDown = document.getElementById('toolbar')
    const downBtn = document.createElement('button')
    downBtn.classList.add('btn')
    let iconDown = document.createElement('i')
    iconDown.classList.add('fas')
    iconDown.classList.add('fa-arrow-circle-down')
    downBtn.appendChild(iconDown)


    downBtn.addEventListener('click', () => {
        const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        const newTab = window.open('about:blank','image from canvas');
        newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");

    })
    toolBarDown.insertAdjacentElement('afterbegin', downBtn)

    const toolBarSave = document.getElementById('toolbar')
    const saveBtn = document.createElement('button')
    saveBtn.classList.add('btn')
    let iconSave = document.createElement('i')
    iconSave.classList.add('fas')
    iconSave.classList.add('fa-save')
    saveBtn.appendChild(iconSave)

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('points', JSON.stringify(points));
    })
    toolBarSave.insertAdjacentElement('afterbegin', saveBtn)

    const toolBarRest = document.getElementById('toolbar')
    const restBtn = document.createElement('button')
    restBtn.classList.add('btn')
    let iconRest = document.createElement('i')
    iconRest.classList.add('far')
    iconRest.classList.add('fa-window-restore')
    restBtn.appendChild(iconRest)

    restBtn.addEventListener('click', () => {
        let stringPoints = localStorage.getItem('points');
        points = JSON.parse(stringPoints);
        isPaint= true;
        redraw();
        isPaint = false;
    })
    toolBarRest.insertAdjacentElement('afterbegin', restBtn)

    const toolBarTime = document.getElementById('toolbar')
    const timeBtn = document.createElement('button')
    timeBtn.classList.add('btn')
    let iconTime = document.createElement('i')
    iconTime.classList.add('fas')
    iconTime.classList.add('fa-clock')
    timeBtn.appendChild(iconTime)

    timeBtn.addEventListener('click', () => {
        context.fillText(new Date().toString(), 350, 10)
    })
    toolBarTime.insertAdjacentElement('afterbegin', timeBtn)

    const colorPicker = document.getElementById("color-picker");
    colorPicker.addEventListener("change", () => {
        options.strokeColor = colorPicker.value;
    });

    const brushPicker = document.getElementById("brush-picker");
    brushPicker.addEventListener("change", () => {
        options.strokeWidth = brushPicker.value;
    });

    const toolBarImg = document.getElementById('toolbar')
    const imgBtn = document.createElement('button')
    imgBtn.classList.add('btn')
    imgBtn.classList.add('btn')
    let iconImg = document.createElement('i')
    iconImg.classList.add('fas')
    iconImg.classList.add('fa-images')
    imgBtn.appendChild(iconImg)

    imgBtn.addEventListener('click', () => {
        const img = new Image;
        img.src =`https://st.depositphotos.com/1011976/4164/i/600/depositphotos_41640421-stock-photo-meadow-at-sunset.jpg`;
        img.onload = () => {
            context.drawImage(img, 0, 0);
        }
    })
    toolBarImg.insertAdjacentElement('afterbegin', imgBtn)

    // let newTime = newDate
}
