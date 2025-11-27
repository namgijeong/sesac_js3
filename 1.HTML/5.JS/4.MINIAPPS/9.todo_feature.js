const addBtn = document.getElementById('add-todo');
const newTodoDiv = document.getElementById('new-todo');

const allComplete = document.getElementById('all_complete');
const allDelete = document.getElementById('all_delete');
const partComplete = document.getElementById('part_complete');
const partDelete = document.getElementById('part_delete');

const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    //trim()을 통해서 앞뒤 원치않는 공백문자를 제거한다
    // === => js는 2와 "2"를 같은걸로 판단하기 때문에  ===을 써야한다
    //다른 모든 개발언어에서의 == 사실은 js에서는 === 였다
    const newTodo = newTodoDiv.value.trim();
    console.log(newTodo);

    //새로 추가된 동적 li 태그들을 가져온다
    const dynamicLitags = document.querySelectorAll('#todo-list div li');

    //새로 추가된 동적 li 태그들의 내부 내용 배열을 만든다.
    let dynamicLitagsTextContent = [];
    dynamicLitags.forEach((dynamicLitag) => {
        dynamicLitagsTextContent.push(dynamicLitag.textContent);
    });

    //빈칸을 막는다
    if (newTodo === '') {
        return;
    }
    else {
        //중복방지를 한다
        for (let i = 0; i < dynamicLitagsTextContent.length; i++) {
            if (newTodo === dynamicLitagsTextContent[i]) {
                return;
            }
        }

        //중복방지도 통과하면 
        const new_div = document.createElement('div');
        new_div.classList.add('li_container');

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox_container');

        const checkboxInput = document.createElement('input');
        checkboxInput.type = "checkbox";

        const new_li = document.createElement('li');
        new_li.textContent = newTodo;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete', 'item-button');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', (ev) => {
            ev.target.parentNode.remove();
        });

        const updateBtn = document.createElement('button');
        updateBtn.classList.add('update', 'item-button');
        updateBtn.textContent = '수정';
        updateBtn.addEventListener('click', (ev) => {
            if (ev.target.textContent === '수정') {
                const tmpInput = document.createElement('input');
                tmpInput.type = "text";
                const currentLi = ev.target.parentNode.querySelector('li');
                tmpInput.value = currentLi.textContent;

                ev.target.parentNode.replaceChild(tmpInput, currentLi);
                ev.target.textContent = '완료';
            }
            else {
                const currentInput = ev.target.parentNode.querySelector('input[type="text"]');

                if (currentInput.value.trim() == '') {
                    alert('입력내용이 있어야 수정완료가 됩니다.');
                    return;
                }
                else {
                    const tmpLi = document.createElement('li');
                    tmpLi.textContent = currentInput.value;

                    ev.target.parentNode.replaceChild(tmpLi, currentInput);
                    ev.target.textContent = '수정';
                }
            }

        });

        checkboxContainer.appendChild(checkboxInput);
        new_div.appendChild(checkboxContainer);

        new_div.appendChild(new_li);

        new_div.appendChild(updateBtn);
        new_div.appendChild(deleteBtn);

        todoList.appendChild(new_div);

        //입력후 입력칸 지운다.
        newTodoDiv.value = '';
    }

});

newTodoDiv.addEventListener('keydown', (ev) => {
    //console.log(ev.key);
    //입력박스에서 엔터 누를시 입력처리 과정 한다
    if (ev.key == "Enter") {
        addBtn.click();
    }

});

todoList.addEventListener('click', (ev) => {
    let clickedTag = ev.target.tagName.toLowerCase();
    if (clickedTag !== 'li') {
        return;
    }
    else {
        //방법1
        // let currentClassStatus = ev.target.classList.contains('clear');
        // if (currentClassStatus) {
        //     ev.target.classList.remove('clear');
        //     ev.target.classList.add('not-clear');
        // }
        // else {
        //     ev.target.classList.remove('not-clear');
        //     ev.target.classList.add('clear');
        // }

        //방법2. toggle로 class를 붙였다 떼다 할 수 있다
        ev.target.classList.toggle('clear');
    }

});

allComplete.addEventListener('click', () => {
    //동적으로 만들었던 체크박스들을 불러온다
    const dynamicCheckboxes = document.querySelectorAll('#todo-list  input[type="checkbox"]');
    const dynamicLitags = document.querySelectorAll('#todo-list  li');

    //배열을 돌며 체크해버린다.
    dynamicCheckboxes.forEach((dynamicCheckbox) => {
        dynamicCheckbox.checked = true;
    });

    //동적으로 만든 li 태그들에 줄을 그어 버린다.
    dynamicLitags.forEach((dynamicLitag) => {
        dynamicLitag.classList.add('clear');
    });
});

allDelete.addEventListener('click', () => {
    //동적으로 만들었던 li의 부모태그 div들을 불러온다
    const dynamicDivContainers = document.querySelectorAll('#todo-list div.li_container');

    dynamicDivContainers.forEach((dynamicDivContainer) => {
        dynamicDivContainer.remove();
    });
});

partComplete.addEventListener('click', () => {
    //동적으로 만들었던 체크박스들을 불러온다
    const dynamicCheckboxes = document.querySelectorAll('#todo-list  input[type="checkbox"]');

    //체크박스가 체크되어있다면, 부모노드를 통하여 li 태그를 찾는다
    dynamicCheckboxes.forEach((dynamicCheckbox) => {
        let currentLi = dynamicCheckbox.parentNode.parentNode.querySelector('li');
        if (dynamicCheckbox.checked) {
            currentLi.classList.add('clear');
        }
        //체크를 바꾸고 다시 누르는 경우도 있으니까
        else {
            currentLi.classList.remove('clear');
        }

    });
});

partDelete.addEventListener('click', () => {
    //동적으로 만든 체크박스 불러오기
    const dynamicCheckboxes = document.querySelectorAll('#todo-list div input[type="checkbox"]');

    //체크되어있다면, 해당부모 노드 div를 찾기 
    dynamicCheckboxes.forEach((dynamicCheckbox) => {
        if (dynamicCheckbox.checked) {
            let currentDivContainer = dynamicCheckbox.parentNode.parentNode;
            currentDivContainer.remove();
        }
    });
});