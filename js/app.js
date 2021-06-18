const btn = document.getElementById('submit')
const container = document.querySelector('.container_list')

function load() {
    let children = document.querySelector('.list')
    let value = localStorage.getItem('qtd')
    for (let i = 0; i < value; i++) {
        if (value > 0) {
            container.appendChild(new createList(localStorage.getItem(`valor${i + 1}`)))
            let check = document.getElementById(`check${i + 1}`)
            let input = document.getElementById(`value${i + 1}`)
            let list = document.getElementById(`list${i + 1}`)
            if (localStorage.getItem(`check${i + 1}`) == "true") {
                check.value = true
                check.setAttribute('checked','')
                input.classList.add('check')
                list.classList.add('check_list')
            } else {
                check.value = false
                input.classList.remove('check')
                list.classList.remove('check_list')
            }
        } else {
            container.removeChild(children)
        }
    }
}

function createElement(tag, name, type) {
    if (tag == "div") {
        this.element = document.createElement(tag)
        this.element.classList.add(name)
        return this.element
    } else if (tag == "input") {
        this.element = document.createElement(tag)
        this.element.setAttribute(name, type)
        return this.element
    } else {
        this.element = document.createElement(tag)
        return this.element
    }
}

function createList(tarefa) {
    let valueElement = container.children.length // pegar tamanho da tag container
    // Criar a div lista e adicionar os seus filhos
    let div = new createElement('div', 'list')
    let inputText = new createElement('input', 'type', 'text')
    let inputCheck = new createElement('input', 'type', 'checkbox')
    let button = new createElement('button')
    div.appendChild(inputCheck)
    div.appendChild(inputText)
    div.appendChild(button)

    // adicionar classes
    inputCheck.classList.add('btn_check')
    button.classList.add('delete')
    //Adicionar id, eventos e valores a tags 
    inputText.setAttribute('id', `value${valueElement + 1}`)
    div.setAttribute('id', `list${valueElement + 1}`)
    button.setAttribute('id', `delete${valueElement + 1}`)
    inputCheck.setAttribute('id', `check${valueElement + 1}`)
    inputText.setAttribute('onkeypress', 'changeValue(event,this)')
    inputText.setAttribute('onblur', 'changeValue(event,this)')
    button.setAttribute('onclick', 'deleteList(this)')
    inputCheck.setAttribute('onclick', `check(this)`)
    inputCheck.setAttribute('value', false)
    button.innerHTML = "Delete"
    inputText.value = tarefa
    
    return div
}

function changeValue(event, element) {
    let valueElement = element.id.charAt(5)
    let input = element.value
    const local = {
        valor: localStorage.getItem(`valor${valueElement}`),
        valorAtual: input
    }
    if (local.valorAtual == "") {
        localStorage.setItem(`valor${valueElement}`, local.valor)
    } else {
        localStorage.setItem(`valor${valueElement}`, local.valorAtual)
    }
}

function check(event) {
    let valueElement = event.id.charAt(5)
    let input = document.getElementById(`value${valueElement}`)
    let list = document.getElementById(`list${valueElement}`)
    let value = input.value
    if (event.value == "false") {
        event.value = true
        input.classList.add('check')
        list.classList.add('check_list')
        localStorage.setItem(`check${valueElement}`, 'true')

    } else {
        event.value = false
        input.classList.remove('check')
        list.classList.remove('check_list')
        localStorage.setItem(`check${valueElement}`, 'false')
    }
    console.log(event, event.value)


}

load()

btn.addEventListener("click", () => {
    let tarefa = document.getElementById('tarefa').value
    container.appendChild(new createList(tarefa))
    localStorage.setItem(`valor${container.children.length}`, `${tarefa}`)
    localStorage.setItem(`qtd`, container.children.length)
})

function deleteList(event) {
    let valueElement = event.id.charAt(6)
    let list = document.getElementById(`list${valueElement}`)
    let qtd = Number(localStorage.getItem('qtd'))
    list.remove()
    localStorage.removeItem(`valor${valueElement}`)
    localStorage.setItem('qtd', --qtd)
    localStorage.removeItem(`check${valueElement}`)
}