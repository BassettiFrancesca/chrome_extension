const showBookmark = document.getElementById('show-insert-bookmark');
const form = document.getElementById('insert-bookmark');
const msg = document.getElementById('msg');
const bookmark = document.getElementById('bookmark-id');
const folders = document.getElementById('folders');
const msgFs = document.getElementById('msg-folders');

const showFolder = document.getElementById('show-insert-folder');
const formFolder = document.getElementById('insert-folder');
const msgFolder = document.getElementById('msg-f');
const folder = document.getElementById('folder-id');
const foldersF = document.getElementById('folders-f');

const showFoldersSaved = document.getElementById('show-folders');
const folderList = document.getElementById('folder-list');

const im = document.getElementById('import');
const e = document.getElementById('export');

const instr = document.getElementById('instructions');
const instrT = document.getElementById('instructions-text'); 

let listOfFolders = [];
let tabUrl;
let folderSelected;
let addBookmarkShow = false;
let addFolderShow = false;
let areFoldersShown = false;
let listOfFN = [];
let listOfBN = [];
let instrOpen = false;

function emptyLists() {
    if (folders.innerHTML != '') {
        folders.innerHTML = '';
    }
    if (foldersF.innerHTML != '') {
        foldersF.innerHTML = '';
    }
    if (folderList.innerHTML != '') {
        folderList.innerHTML = '';
    }
}

showBookmark.addEventListener('click', showBookmarks);

function showBookmarks() {
    folderSelected = undefined;
    if (addBookmarkShow == false) {
        emptyLists();
        folderList.style.display = 'none';
        formFolder.style.display = 'none';
        addBookmarkShow = true;
        form.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showSelectListofFolders(listOfFolders, folders);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('There are no folders yet, click "Add Folder" to add a folder'));
            folders.appendChild(li);
        }
    } else {
        addBookmarkShow = false;
        form.style.display = 'none';
    }
}

showFolder.addEventListener('click', showFolders);

function showFolders() {
    folderSelected = undefined;
    if (addFolderShow == false) {
        emptyLists();
        form.style.display = 'none';
        folderList.style.display = 'none';
        addFolderShow = true;
        formFolder.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showSelectListofFolders(listOfFolders, foldersF);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('There are no folders yet, write the name of the folder and click "Submit"'));
            foldersF.appendChild(li);
        }
    } else {
        addFolderShow = false;
        formFolder.style.display = 'none';
    }
}

showFoldersSaved.addEventListener('click', showSavedFolders);

function showSavedFolders() {
    if (areFoldersShown == false) {
        emptyLists();
        form.style.display = 'none';
        formFolder.style.display = 'none';
        areFoldersShown = true;
        folderList.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showListofFolders(listOfFolders, folderList);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('There are no folders yet, click "Add Folder" to add a folder'));
            folderList.appendChild(li);
        }
    } else {
        areFoldersShown = false;
        folderList.style.display = 'none';
    }
}


function showSelectListofFolders(listOfFd, fds) {
    fds.innerHTML = '';
    for (let folderObj of listOfFd) {
        let f = {
            urls : [],
            folders : [],
            name : folderObj.name,
            open : false,
            selectFolder : function() {
                msgFs.innerHTML = '';
    
                if (f.open == false){
                    if (document.getElementById(`${f.name}f`).hasChildNodes()) {
                        document.getElementById(`${f.name}f`).style.display = 'block';
                    }
                    document.getElementById(`${f.name}folder`).style.fontWeight = '900';
                    if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                        document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                    }
                    if (folderSelected) {
                        folderSelected.open = false;
                    }
                    folderSelected = f;
                    showSelectListofFolders(f.folders, document.getElementById(`${f.name}f`));
                    f.open = true;
                } else {
                    document.getElementById(`${f.name}folder`).style.fontWeight = 'normal';
                    if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                        document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                    }
                    folderSelected = undefined;
                    document.getElementById(`${f.name}f`).style.display = 'none';
                    f.open = false;
                }
            }
        }

        for (let fd of folderObj.folders) {
            f.folders.push(fd);
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('id', `${f.name}folder`);
        const ul = document.createElement('ul');

        ul.setAttribute('id', `${f.name}f`);
        ul.setAttribute('display', 'block');

        a.addEventListener('click', f.selectFolder);
        a.appendChild(document.createTextNode(`${f.name}`));
        a.style.display = 'block';

        li.appendChild(a);
        li.appendChild(ul);
    
        fds.appendChild(li);

        if (document.getElementById(`${f.name}f`) == undefined) {
            fds.appendChild(li); 
        }
    }
}

function showListofFolders(listOfFd, fh) {
    fh.innerHTML = '';
    for (let folderObj of listOfFd) {
        let f = {
            urls : [],
            folders : [],
            name : folderObj.name,
            open : false,
            openFolder : function() {
                if (f.open == false){
                    document.getElementById(`${f.name}b`).innerHTML = '';
                    document.getElementById(`${f.name}f`).style.display = 'block';
                    document.getElementById(`${f.name}b`).style.display = 'block';
                    showListofFolders(f.folders, document.getElementById(`${f.name}f`));
                    for (let b of f.urls) {
                        let bookmarkUrl = {
                            url : b.url,
                            name : b.name,
                            folder : f.name,
                            openUrl : function() {
                                chrome.tabs.create({
                                    url: b.url
                                })
                            },
                            deleteB : function() {
                                listOfBN.pop(b.name);
                                f.urls.pop(b);
                                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
                                let foundb = false;
                                deleteBookmark(bookmarkUrl, listOfFolders, foundb);
                                let folderListSerialized = JSON.stringify(listOfFolders);
                                localStorage.setItem("folderList", folderListSerialized);
                                document.getElementById(`${b.name}bm`).remove();
                            }
                        }
            
                        let lib = document.createElement('li');
                        lib.setAttribute('id', `${b.name}bm`);
                        let ab = document.createElement('a');
                        let db = document.createElement('a');
                
                        ab.addEventListener('click', bookmarkUrl.openUrl);
                        ab.appendChild(document.createTextNode(`${bookmarkUrl.name}`));
                        ab.style.display = 'block';
                        db.addEventListener('click', bookmarkUrl.deleteB);
                        db.appendChild(document.createTextNode('X'));
                        db.style.display = 'block';
                
                        lib.appendChild(ab);
                        lib.appendChild(db);
                
                        document.getElementById(`${f.name}b`).appendChild(lib);
                    }
                    f.open = true;
                } else {
                    document.getElementById(`${f.name}f`).style.display = 'none';
                    document.getElementById(`${f.name}b`).style.display = 'none';
                    f.open = false;
                }
            },
            deleteF : function() {
                listOfFN.pop(f.name);
                listOfFd.pop(folderObj);
                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
                let foundf = false;
                deleteFolder(f, listOfFolders, foundf);
                let folderListSerialized = JSON.stringify(listOfFolders);
                localStorage.setItem("folderList", folderListSerialized);
                document.getElementById(`${f.name}fd`).innerHTML = '';
                document.getElementById(`${f.name}fd`).remove();
            }
        }

        for (let ur of folderObj.urls) {
            f.urls.push(ur);
        }

        for (let fd of folderObj.folders) {
            f.folders.push(fd);
        }

        const li = document.createElement('li');
        li.setAttribute('id', `${f.name}fd`);
        const a = document.createElement('a');
        const df = document.createElement('a');
        const ulf = document.createElement('ul');
        const ulb = document.createElement('ul');

        ulf.setAttribute('id', `${f.name}f`);
        ulb.setAttribute('id', `${f.name}b`);
        ulf.setAttribute('display', 'block');
        ulb.setAttribute('display', 'block');

        a.addEventListener('click', f.openFolder);
        a.appendChild(document.createTextNode(`${f.name}`));
        a.style.display = 'block';

        df.addEventListener('click', f.deleteF);
        df.appendChild(document.createTextNode('X'));
        df.style.display = 'block';

        li.appendChild(a);
        li.appendChild(df);
        li.appendChild(ulf);
        li.appendChild(ulb);

        fh.appendChild(li); 

        if (document.getElementById(`${f.name}f`) == undefined) {
             fh.appendChild(li); 
        }
    }
}

formFolder.addEventListener('submit', onSubmitFolder);

function onSubmitFolder(e) {

    let sameName;

    e.preventDefault();

    if (folderSelected == undefined) {

        if(folder.value === '') {

            msgFolder.innerHTML = 'Please enter the name of your folder';

        } else {

            sameName = false;
                
            if (listOfFN.length > 0) {
                for (let f of listOfFN) {
                    if (f == folder.value) {
                        msgFolder.innerHTML = 'This name already exist, please enter a different name';
                        sameName = true;
                    }
                }
            }

        }

        if (sameName === false) {

            listOfFN.push(folder.value);

            msgFolder.innerHTML = '';

            let folderObj = {
                urls : [],
                folders : [],
                name : folder.value,
                open : false,
                selectFolder : function() {
                    msgFs.innerHTML = '';
                    
                    if (folderObj.open == false){
                        document.getElementById(`${folderObj.name}folder`).style.fontWeight = '900';
                        if (document.getElementById(`${folderObj.name}f`).hasChildNodes()) {
                            document.getElementById(`${folderObj.name}f`).style.display = 'block';
                        }
                        if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                            document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                        }
                        if (folderSelected) {
                            folderSelected.open = false;
                        }
                        folderSelected = folderObj;
                        showSelectListofFolders(folderObj.folders, document.getElementById(`${folderObj.name}f`));
                        folderObj.open = true;
                    } else {
                        document.getElementById(`${folderObj.name}folder`).style.fontWeight = 'normal';
                        if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                            document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                        }
                        folderSelected = undefined;
                        document.getElementById(`${folderObj.name}f`).style.display = 'none';
                        folderObj.open = false;
                    }
                }
            }

            if (localStorage.getItem("folderList") != null  && localStorage.getItem("folderList") != '[]') {
                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            }

            listOfFolders.push(folderObj);

            let listOfFoldersSerialized = JSON.stringify(listOfFolders);

            localStorage.setItem("folderList", listOfFoldersSerialized);

            folder.value = '';

        }
        
    } else {

        if(folder.value === '') {

            msgFolder.innerHTML = 'Please enter the name of your folder';

        } else {

            sameName = false;
                
            if (listOfFN.length > 0) {
                for (let f of listOfFN) {
                    if (f == folder.value) {
                        msgFolder.innerHTML = 'This name already exists, please enter a different name';
                        sameName = true;
                    }
                }
            }

        }

        if (sameName === false) {

            listOfFN.push(folder.value);

            msgFolder.innerHTML = '';

            let folderObj = {
                urls : [],
                folders : [],
                name : folder.value,
                open : false,
                selectFolder : function() {
                    msgFs.innerHTML = '';
                    
                    if (folderObj.open == false){
                        document.getElementById(`${folderObj.name}folder`).style.fontWeight = '900';
                        if (document.getElementById(`${folderObj.name}f`).hasChildNodes()) {
                            document.getElementById(`${folderObj.name}f`).style.display = 'block';
                        }
                        if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                            document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                        }
                        if (folderSelected) {
                            folderSelected.open = false;
                        }
                        folderSelected = folderObj;
                        showSelectListofFolders(folderObj.folders, document.getElementById(`${folderObj.name}f`));
                        folderObj.open = true;
                    } else {
                        document.getElementById(`${folderObj.name}folder`).style.fontWeight = 'normal';
                        if (folderSelected && document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                            document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                        }
                        folderSelected = undefined;
                        document.getElementById(`${folderObj.name}f`).style.display = 'none';
                        folderObj.open = false;
                    }
                }
            }

            // potrei forse fare un costruttore invece che ripetere

            let found = false;

            listOfFolders = JSON.parse(localStorage.getItem("folderList"));

            saveFolder(folderSelected, folderObj, listOfFolders, found);

            let listOfFoldersSerialized = JSON.stringify(listOfFolders);

            localStorage.setItem("folderList", listOfFoldersSerialized);

            folder.value = '';
            if (document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
            }
            folderSelected = undefined;

        }
    }
    showSelectListofFolders(listOfFolders, foldersF);
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();

    chrome.tabs.query({'active': true}, function (tabs) {

        let sameName;

        tabUrl = tabs[0].url;

        if (folderSelected == undefined) {

            msgFs.innerHTML = 'Please select a folder';

        } else {
            if (bookmark.value === '') {

                msg.innerHTML = 'Please enter the name of your bookmark';

            } else {

                sameName = false;
                
                if (listOfBN.length > 0) {
                    for (let n of listOfBN) {
                        if (n == bookmark.value) {
                            msg.innerHTML = 'This name already exists, please enter a different name';
                            sameName = true;
                        }
                    }
                }

            }
    
            if (sameName === false) {

                listOfBN.push(bookmark.value);
                
                msg.innerHTML = '';
                msgFs.innerHTML = '';

                let bookmarkUrl = {
                    url : tabUrl,
                    name : bookmark.value,
                    folder : folderSelected.name,
                    openUrl : function() {
                        chrome.tabs.create({
                            url: tabUrl
                        })
                    },
                    deleteB : function() {
                        listOfFolders = JSON.parse(localStorage.getItem("folderList"));
                        let foundb = false;
                        deleteBookmark(bookmarkUrl, listOfFolders, foundb);
                        let folderListSerialized = JSON.stringify(listOfFolders);
                        localStorage.setItem("folderList", folderListSerialized);
                        document.getElementById(`${bookmarkUrl.name}`).remove();
                    }
                }

                listOfFolders = JSON.parse(localStorage.getItem("folderList"));

                let found = false;

                saveBookmark(folderSelected, bookmarkUrl, listOfFolders, found);

                let folderListSerialized = JSON.stringify(listOfFolders);
    
                localStorage.setItem("folderList", folderListSerialized);
    
                bookmark.value = '';
                if (document.getElementById(`${folderSelected.name}folder`).style.fontWeight) {
                    document.getElementById(`${folderSelected.name}folder`).style.fontWeight = 'normal';
                }
                folderSelected = undefined;
    
            }

        }
    })
}

function saveFolder(fs, fo, list, found) {

    if (list.length > 0) {
        for (let f of list) {
            if (found == true) {
                break;
            }
            if (f.name == fs.name) {
                f.folders.push(fo);
                found = true;
            } else {
                found = saveFolder(fs, fo, f.folders, found);
            }
        }
    }

    return found;

}

function deleteFolder(fd, list, foundf) {

    if (list.length > 0) {
        for (let f of list) {
            if (foundf == true) {
                break;
            }
            if (f.name == fd.name) {
                list.pop(f);
                foundf = true;
            } else {
                foundf = deleteFolder(fd, f.folders, foundf);
            }
        }
    }

    return foundf;

}

function saveBookmark(fs, bm, list, found) {

    if (list.length > 0) {
        for (let f of list) {
            if (found == true) {
                break;
            }
            if (f.name == fs.name) {
                f.urls.push(bm);
                found = true;
            } else {
                found = saveBookmark(fs, bm, f.folders, found);
            }
        }
    }

    return found;

}

function deleteBookmark(b, list, foundb) {

    if (list.length > 0) {
        for (let f of list) {
            if (foundb == true) {
                break;
            }
            if (f.name == b.folder) {
                for (let i of f.urls){
                    if (i.name == b.name) {
                        f.urls.pop(i);
                        foundb = true;
                    }
                }
            } else {
                foundb = deleteBookmark(b, f.folders, foundb);
            }
        }
    }

    return foundb;

}

instr.addEventListener('click', openInstructions);

function openInstructions() {
    if (instrOpen == false) {
        instrOpen = true;
        instrT.style.display = 'block';
    } else {
        instrOpen = false;
        instrT.style.display = 'none';
    }
}

im.addEventListener('click', importJSON);

function readJSONFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function importJSON() {
    folderList.style.display = 'none';
    formFolder.style.display = 'none';
    form.style.display = 'none';
    readJSONFile("./bookmarkstaxonomy.json", function(json){
        let data = JSON.parse(json);
        console.log(data);
        let listOfFoldersSerialized = JSON.stringify(data);
        localStorage.setItem("folderList", listOfFoldersSerialized);
        console.log(localStorage);
    })
}

e.addEventListener('click', export2json);

function export2json() {

    listOfFolders = JSON.parse(localStorage.getItem("folderList"));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(listOfFolders, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "bookmarkstaxonomy.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}

