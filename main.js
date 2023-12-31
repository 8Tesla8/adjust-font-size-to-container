const inputContainerWidth = document.getElementById('widthCont');
const inputContainerHeight = document.getElementById('heightCont');
const inputContainerText = document.getElementById('textCont');
const mainContainer = document.getElementById('mainContainer');
const containerNumb = document.getElementById('containerNumb');

const containerCount = 20;
const textLength = 35;

createContainers();
function createContainers(){
    const widthCont = inputContainerWidth.value;
    const heightCont = inputContainerHeight.value;

    for (let index = 0; index < containerCount; index++) {
        const newItem = document.createElement("div");
        newItem.setAttribute("id",`${index}`);
        newItem.classList.add("child-container");
        newItem.style.width = `${widthCont}px`;
        newItem.style.height = `${heightCont}px`;
        newItem.textContent = `${index})${createRandomText(textLength)}`;
        
        const className = index%2==0 ? 'one-line' : 'multi-line';
        newItem.classList.add(className);

        mainContainer.appendChild(newItem);
    }

    setFontSize();
}

createOptionSelection();
function createOptionSelection(){

    for (let index = 0; index < containerCount; index++) {
        const newItem = document.createElement("option");
        newItem.value = `${index}`;
        newItem.textContent = `${index}`;
        containerNumb.appendChild(newItem);
    }
}

function createRandomText(maxLength){
    const text ='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, cupiditate saepe, impedit nemo dolorem modi, dolor nostrum soluta ex doloremque ut veniam quas optio? Maiores accusamus ratione unde perferendis odio natus ad cumque nobis amet voluptatem debitis, ipsam laboriosam saepe quidem earum sint quas eaque repellat vero laudantium beatae illo dicta iste consectetur? Rerum, culpa adipisci reprehenderit ad, sunt ullam magnam sint quis at dolores eius est distinctio neque cumque ea unde iusto, quae nostrum consequuntur dolorem molestias vel. Ducimus?';
    
    if(maxLength === undefined || maxLength == 0){
        maxLength = text.length;
    }

    const length = Math.floor(Math.random() * maxLength) +1;
    const textRes = text.substring(0, length) + '.';
    return textRes;
}


const applyBtn = document.getElementById('applyBtn');
applyBtn.addEventListener('click', ()=>{
    const numb = containerNumb.value;

    let containers = [];
    if(numb == 'all'){
        containers = document.getElementsByClassName('child-container');
    }
    else {
        containers.push(
            document.getElementById(+numb)
        );
    }

    const widthCont = inputContainerWidth.value;
    const heightCont = inputContainerHeight.value;
    Array.from(containers).forEach(container => {
        container.style.width = `${widthCont}px`;
        container.style.height = `${heightCont}px`;
        const conteinerId = container.getAttribute("id");

        let userText = inputContainerText.value;
        if(userText === undefined || userText === null || userText === ''){
            container.textContent = `${conteinerId})${createRandomText(textLength)}`;
        }
        else {
            container.textContent =  `${conteinerId})${userText}`;
        }
    });

    setFontSize();
});

function setFontSize(){
    const containers = document.getElementsByClassName('child-container');

    Array.from(containers).forEach(container => {
        // Starting font size
        let fontSize = 100; 
        container.style.fontSize = `${fontSize}px`;

        // Decrease font size until the text fits
        while (container.scrollWidth > container.offsetWidth || container.scrollHeight > container.offsetHeight) {
            fontSize -= 1;
            container.style.fontSize = `${fontSize}px`;
        }
    });
}

setFontSizeWitoutFixedSize();
function setFontSizeWitoutFixedSize(){
    const childContainer = document.getElementById('childContainer');

    const newItem = document.createElement("div");
    newItem.classList.add('multi-line');

    newItem.style.width = childContainer.offsetWidth + 'px';
    newItem.style.height = childContainer.offsetHeight + 'px';
    newItem.textContent = childContainer.textContent;
    document.body.appendChild(newItem);

    let fontSize = 100; 
    newItem.style.fontSize = `${fontSize}px`;

    while (newItem.scrollWidth > newItem.offsetWidth || newItem.scrollHeight > newItem.offsetHeight) {
        fontSize -= 1;
        newItem.style.fontSize = `${fontSize}px`;
    }
    newItem.remove();

    childContainer.style.fontSize = `${fontSize}px`;
}
window.addEventListener('resize', () => {
    setFontSizeWitoutFixedSize()
});
