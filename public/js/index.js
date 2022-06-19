window.onload = (event) => {
    getAllQuotes();
};
const getAllQuotes = async function() {
    await fetch("/api/getAllQuotes").then((response) =>
        response.json().then((res) => renderQuotes(res))
    );
};
const renderQuotes = (result) => {
    let allCardConteiner = document.getElementById("card-conteiner");
    allCardConteiner.innerHTML = "";
    for (let i = result.length - 1; i >= 0; i--) renderQuote(result[i]);
};
const renderQuote = (Quote) => {
    let allCardConteiner = document.getElementById("card-conteiner");
    let cardConteiner = document.createElement("div");
    cardConteiner.innerHTML = `
    <div class="col s4 ">
    <div class="card grey darken-4">
        <div class="card-content white-text">
            <span class="card-title">${Quote["name"]}</span>
            <p>${Quote.quote}</p>
        </div>
        <div class="card-action" id="${Quote._id}">
            <button id="editQuote"onclick="popUpEditQuoteBtn(event)" class=" waves-effect waves-light btn-small transparent ">Edit</button>
            <button id="" onclick ="deleteQuoteBtn(event)" class=" waves-effect waves-light btn-small   red" class=" waves-effect waves-light btn-small transparent " class=" waves-effect waves-light btn-small transparent red-text">Delete</button>
        </div>
    </div>
</div>
    `;
    allCardConteiner.appendChild(cardConteiner);
};
const deleteQuoteBtn = function(event) {
    try {
        deleteQuote(event);
    } catch {}
};
const deleteQuote = async(event) => {
    await fetch("/api/deletequote", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: event.path[1].id,
        }),
    }).then((res) => getAllQuotes());
};
const popUpEditQuoteBtn = function(event) {
    try {
        popUpEditQuote(event);
    } catch {}
};
const popUpEditQuote = function(event) {
    //    console.log(event.path[1].id);
    var modal = document.getElementById("modal1");
    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = ` <div class="col s12" id="addquoteform">
    <div class="row">
        <div class="input-field col s6">
            <input id="input_text_edit" name="name" value="${event.path[2].childNodes[1].childNodes[1].outerText}" type="text" data-length="10">
          
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
            <textarea id="textarea_edit" value="hkhl"  class="materialize-textarea"
             name="quote" data-length="120">${event.path[2].childNodes[1].childNodes[3].outerText}</textarea>
     
        </div>
    </div>
    <div class="row text-center">
        <div class=" col offset-s6 s6">
            <button type="" id="e-${event.path[1].id}" onclick="editQuoteBtn(event)" class="waves-effect waves-light btn-small grey darken-4">
                EDIT
            </button>

        </div>
    </div>
</div>`;
    const instance = M.Modal.init(modal, { dismissible: false });
    instance.open();
};
const editQuoteBtn = function(event) {
    try {
        editQuote(event.srcElement.id);
    } catch {}
};
const editQuote = async(id) => {
    let name = document.getElementById("input_text_edit").value;
    let quote = document.getElementById("textarea_edit").value;

    await fetch("/api/updatequote", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id.slice(2),
            name: name,
            quote: quote,
        }),
    }).then((res) => closeModal());
};
document
    .getElementById("addNewQuoteBtn")
    .addEventListener("click", async() => {
        let name = document.getElementById("input_text").value;
        let quote = document.getElementById("textarea").value;
        //    console.log(name + "" + quote);
        await fetch("/api/addNewQuote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                quote: quote,
            }),
        }).then((res) => getAllQuotes());
    });

function closeModal() {
    var modal = document.getElementById("modal1");
    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `  `;
    const instance = M.Modal.init(modal, { dismissible: false });
    instance.close();
    getAllQuotes();
}
window.onclick = function(event) {
    if (event.target.classList[0] == "modal-overlay") {
        closeModal();
    }
};