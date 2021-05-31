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
const msgFF = document.getElementById('msg-folders-f');

const showFoldersSaved = document.getElementById('show-folders');
const folderList = document.getElementById('folder-list');

const im = document.getElementById('import');
const e = document.getElementById('export');

const instr = document.getElementById('instructions');
const instrT = document.getElementById('instructions-text');

const showImpExp = document.getElementById('show-imp-exp');
const impExp = document.getElementById('imp-exp');
const succImp = document.getElementById('import-success');
const msgImp = document.getElementById('msg-import');
const succExp = document.getElementById('export-success');
const delSuccImp = document.getElementById('del-is');
const delSuccExp = document.getElementById('del-es');

let listOfFolders = [];
let listOfFN = [];
let listOfBN = [];
let tabUrl;
let folderSelected;
let addBookmarkShow = false;
let addFolderShow = false;
let areFoldersShown = false;
let areIEShown = false;
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
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgFolder.innerHTML = '';
    msgFF.innerHTML = '';
    folderSelected = undefined;
    if (addBookmarkShow == false) {
        showBookmark.setAttribute('class', 'open');
        showFoldersSaved.setAttribute('class', 'buttons');
        showFolder.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        folderList.style.display = 'none';
        formFolder.style.display = 'none';
        impExp.style.display = 'none';
        addBookmarkShow = true;
        addFolderShow = false;
        areFoldersShown = false;
        areIEShown = false;
        form.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showSelectListofFolders(listOfFolders, folders);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('Click "Add Folder" to add a folder'));
            folders.appendChild(li);
        }
    } else {
        showBookmark.setAttribute('class', 'buttons');
        addBookmarkShow = false;
        form.style.display = 'none';
    }
}

showFolder.addEventListener('click', showFolders);

function showFolders() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgFolder.innerHTML = '';
    msgFF.innerHTML = '';
    folderSelected = undefined;
    if (addFolderShow == false) {
        showFolder.setAttribute('class', 'open');
        showFoldersSaved.setAttribute('class', 'buttons');
        showBookmark.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        form.style.display = 'none';
        folderList.style.display = 'none';
        impExp.style.display = 'none';
        addFolderShow = true;
        addBookmarkShow = false;
        areFoldersShown = false;
        areIEShown = false;
        formFolder.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showSelectListofFolders(listOfFolders, foldersF);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('Write the name of the folder and click "Submit"'));
            foldersF.appendChild(li);
        }
    } else {
        showFolder.setAttribute('class', 'buttons');
        addFolderShow = false;
        formFolder.style.display = 'none';
    }
}

showFoldersSaved.addEventListener('click', showSavedFolders);

function showSavedFolders() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgFolder.innerHTML = '';
    msgFF.innerHTML = '';
    if (areFoldersShown == false) {
        showFoldersSaved.setAttribute('class', 'open');
        showFolder.setAttribute('class', 'buttons');
        showBookmark.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        form.style.display = 'none';
        formFolder.style.display = 'none';
        impExp.style.display = 'none';
        areFoldersShown = true;
        addFolderShow = false;
        addBookmarkShow = false;
        areIEShown = false;
        folderList.style.display = 'block';
        if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            showListofFolders(listOfFolders, folderList);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-folders');
            li.appendChild(document.createTextNode('Click "Add Folder" to add a folder'));
            folderList.appendChild(li);
        }
    } else {
        showFoldersSaved.setAttribute('class', 'buttons');
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
                msgFolder.innerHTML = '';
                msgFF.innerHTML = '';
    
                if (f.open == false){
                    if (document.getElementById(`${f.name}f`).hasChildNodes()) {
                        document.getElementById(`${f.name}f`).style.display = 'block';
                    }
                    document.getElementById(`${f.name}folder`).setAttribute('class', 'selected');
                    if (folderSelected) {
                        folderSelected.open = false;
                        document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected');
                    }
                    folderSelected = f;
                    showSelectListofFolders(f.folders, document.getElementById(`${f.name}f`));
                    f.open = true;
                } else {
                    document.getElementById(`${f.name}folder`).setAttribute('class', 'not-selected');
                    if (folderSelected) {
                        document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected');
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
        a.setAttribute('class', 'not-selected');
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
                    document.getElementById(`${f.name}icon`).innerHTML = 'folder_open';
                    document.getElementById(`${f.name}d`).style.display = 'none';
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
                            checkDelete : function() {
                                document.getElementById(`${bookmarkUrl.name}d`).style.display = 'block';
                            },
                            dontDelete : function() {
                                document.getElementById(`${bookmarkUrl.name}d`).style.display = 'none';
                            },
                            deleteB : function() {
                                document.getElementById(`${bookmarkUrl.name}d`).style.display = 'none';
                                listOfBN = JSON.parse(localStorage.getItem("bookmarkNames"));
                                let i = listOfBN.indexOf(bookmarkUrl.name);
                                listOfBN.splice(i, 1);
                                let listOfBNSerialized = JSON.stringify(listOfBN);
                                localStorage.setItem("bookmarkNames", listOfBNSerialized);
                                let foundbd = false;
                                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
                                delBookmark(f, bookmarkUrl, listOfFolders, foundbd);
                                let folderListSerialized = JSON.stringify(listOfFolders);
                                localStorage.setItem("folderList", folderListSerialized);
                                document.getElementById(`${bookmarkUrl.name}bm`).remove();
                            }
                        }
            
                        let lib = document.createElement('li');
                        lib.setAttribute('id', `${b.name}bm`);
                        let ab = document.createElement('a');
                        let db = document.createElement('a');
                        let check = document.createElement('p');
                        let yes = document.createElement('a');
                        let no = document.createElement('a');
                
                        ab.addEventListener('click', bookmarkUrl.openUrl);
                        ab.appendChild(document.createTextNode(`${bookmarkUrl.name}`));
                        ab.style.display = 'block';
                        db.addEventListener('click', bookmarkUrl.checkDelete);
                        db.appendChild(document.createTextNode('X'));
                        db.style.display = 'block';

                        check.appendChild(document.createTextNode('Do you want to delete it? '));
                        yes.appendChild(document.createTextNode('Yes '));
                        yes.addEventListener('click', bookmarkUrl.deleteB);
                        no.appendChild(document.createTextNode('No'));
                        no.addEventListener('click', bookmarkUrl.dontDelete);
                        check.appendChild(yes);
                        check.appendChild(no);
                        check.setAttribute('class', 'check');
                        check.setAttribute('id', `${bookmarkUrl.name}d`);
                        yes.setAttribute('class', 'yn');
                        no.setAttribute('class', 'yn');
                        check.style.display = 'none';
                
                        lib.appendChild(ab);
                        lib.appendChild(db);
                        lib.appendChild(check);
                
                        document.getElementById(`${f.name}b`).appendChild(lib);
                    }
                    f.open = true;
                } else {
                    document.getElementById(`${f.name}icon`).innerHTML = 'folder';
                    document.getElementById(`${f.name}f`).style.display = 'none';
                    document.getElementById(`${f.name}b`).style.display = 'none';
                    document.getElementById(`${f.name}d`).style.display = 'none';
                    f.open = false;
                }
            },
            checkDelete : function() {
                document.getElementById(`${f.name}d`).style.display = 'block';
            },
            dontDelete : function() {
                document.getElementById(`${f.name}d`).style.display = 'none';
            },
            deleteF : function() {
                document.getElementById(`${f.name}d`).style.display = 'none';
                listOfFN = JSON.parse(localStorage.getItem("folderNames"));
                let i = listOfFN.indexOf(f.name);
                listOfFN.splice(i, 1);
                let listOfFNSerialized = JSON.stringify(listOfFN);
                localStorage.setItem("folderNames", listOfFNSerialized);
                deleteAllNames(f);
                let foundfd = false;
                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
                delFolder(f, listOfFolders, foundfd);
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
        const i = document.createElement('i');
        const a = document.createElement('a');
        const df = document.createElement('i');
        const ulf = document.createElement('ul');
        const ulb = document.createElement('ul');
        const check = document.createElement('p');
        const yes = document.createElement('a');
        const no = document.createElement('a');
        const containerIn = document.createElement('p');
        const container = document.createElement('p');

        container.setAttribute('class', 'container');
        containerIn.setAttribute('class', 'int-container');

        i.setAttribute('class', 'material-icons');
        i.innerHTML = 'folder';
        i.style.fontSize = '20px';
        i.setAttribute('id', `${f.name}icon`);

        ulf.setAttribute('id', `${f.name}f`);
        ulb.setAttribute('id', `${f.name}b`);
        ulf.setAttribute('display', 'block');
        ulb.setAttribute('display', 'block');

        containerIn.addEventListener('click', f.openFolder);
        a.appendChild(document.createTextNode(`${f.name}`));

        df.addEventListener('click', f.checkDelete);
        df.setAttribute('class', 'material-icons');
        df.innerHTML = 'clear';
        df.style.fontSize = '18px';

        check.appendChild(document.createTextNode('Do you want to delete it? '));
        yes.appendChild(document.createTextNode('Yes '));
        yes.addEventListener('click', f.deleteF);
        no.appendChild(document.createTextNode('No'));
        no.addEventListener('click', f.dontDelete);
        check.appendChild(yes);
        check.appendChild(no);
        check.setAttribute('class', 'check');
        check.setAttribute('id', `${f.name}d`);
        yes.setAttribute('class', 'yn');
        no.setAttribute('class', 'yn');
        check.style.display = 'none';

        containerIn.appendChild(i);
        containerIn.appendChild(a);
        container.appendChild(containerIn);
        container.appendChild(df);
        li.appendChild(container);
        li.appendChild(check);
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

    msgFF.innerHTML = '';

    if (localStorage.getItem("folderNames") != null) {
        listOfFN = JSON.parse(localStorage.getItem("folderNames"));
    }

    let sameName;

    e.preventDefault();

    if (folder.value === '') {

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

        let listOfFNSerialized = JSON.stringify(listOfFN);
    
        localStorage.setItem("folderNames", listOfFNSerialized);

        msgFolder.innerHTML = '';

        let folderObj = {
            urls : [],
            folders : [],
            name : folder.value,
            open : false,
            selectFolder : function() {
                msgFs.innerHTML = '';
                msgFolder.innerHTML = '';
                msgFF.innerHTML = '';
                
                if (folderObj.open == false){
                    document.getElementById(`${folderObj.name}folder`).setAttribute('class', 'selected');
                    if (document.getElementById(`${folderObj.name}f`).hasChildNodes()) {
                        document.getElementById(`${folderObj.name}f`).style.display = 'block';
                    }
                    if (folderSelected) {
                        folderSelected.open = false;
                        document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected');
                    }
                    folderSelected = folderObj;
                    showSelectListofFolders(folderObj.folders, document.getElementById(`${folderObj.name}f`));
                    folderObj.open = true;
                } else {
                    document.getElementById(`${folderObj.name}folder`).setAttribute('class', 'not-selected');
                    if (folderSelected){
                        document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected')
                    }
                    folderSelected = undefined;
                    document.getElementById(`${folderObj.name}f`).style.display = 'none';
                    folderObj.open = false;
                }
            }
        }

        if (folderSelected == undefined) {

            if (localStorage.getItem("folderList") != null && localStorage.getItem("folderList") != '[]') {
                listOfFolders = JSON.parse(localStorage.getItem("folderList"));
            }

            listOfFolders.push(folderObj);

            let listOfFoldersSerialized = JSON.stringify(listOfFolders);

            localStorage.setItem("folderList", listOfFoldersSerialized);

            folder.value = '';

        } else {

            let found = false;

            listOfFolders = JSON.parse(localStorage.getItem("folderList"));
    
            found = saveFolder(folderSelected, folderObj, listOfFolders, found);

            if (found == false) {
                msgFF.innerHTML = 'Error saving the folder';
            }
    
            let listOfFoldersSerialized = JSON.stringify(listOfFolders);
    
            localStorage.setItem("folderList", listOfFoldersSerialized);
    
            folder.value = '';

            document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected');

            folderSelected = undefined;

        }

        showSelectListofFolders(listOfFolders, foldersF);

    }
}

async function saveBM() {

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    tabUrl = tab.url;

    let sameName;

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

            let listOfBNSerialized = JSON.stringify(listOfBN);

            localStorage.setItem("bookmarkNames", listOfBNSerialized);
            
            msg.innerHTML = '';
            msgFs.innerHTML = '';

            let bookmarkUrl = {
                url : tabUrl,
                name : bookmark.value,
                folder : folderSelected.name
            }

            listOfFolders = JSON.parse(localStorage.getItem("folderList"));

            let found = false;

            found = saveBookmark(folderSelected, bookmarkUrl, listOfFolders, found);

            if (found == false) {
                msgFs.innerHTML = 'Error saving the bookmark';
            } else {
                msgFs.innerHTML = 'Bookmark saved successfully';
            }

            let folderListSerialized = JSON.stringify(listOfFolders);

            localStorage.setItem("folderList", folderListSerialized);

            bookmark.value = '';

            document.getElementById(`${folderSelected.name}folder`).setAttribute('class', 'not-selected');

            folderSelected = undefined;
            showSelectListofFolders(listOfFolders, folders);
        }

    }
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {

    if (localStorage.getItem("bookmarkNames") != null) {
        listOfBN = JSON.parse(localStorage.getItem("bookmarkNames"));
    }

    e.preventDefault();

    saveBM();
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

function delFolder(fo, list, foundfd) {

    if (list.length > 0) {
        for (let f of list) {
            if (foundfd == true) {
                break;
            }
            if (f.name == fo.name) {
                deleteItem(fo.name, list);
                foundfd = true;
            } else {
                foundfd = delFolder(fo, f.folders, foundfd);
            }
        }
    }

    return foundfd;

}

function deleteItem(n, list) {

    let found = false;
    let i = 0;
    for (let j of list) {
        if (found == true) {
            break;
        }
        if (j.name == n) {
            list.splice(i, 1);
            found = true;
        }
        i++;
    }

}

function deleteAllNames(f) {
    if (f.folders.length > 0) {
        for (let i of f.folders) {
            let j = listOfFN.indexOf(i.name);
            listOfFN.splice(j, 1);
            let listOfFNSerialized = JSON.stringify(listOfFN);
            localStorage.setItem("folderNames", listOfFNSerialized);
            deleteAllNames(i);
        }
    }
    if (f.urls.length > 0) {
        for (let k of f.urls) {
            let l = listOfBN.indexOf(k.name);
            listOfBN.splice(l, 1);
            let listOfBNSerialized = JSON.stringify(listOfBN);
            localStorage.setItem("bookmarkNames", listOfBNSerialized);
        }
    }
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

function delBookmark(fs, bm, list, foundbd) {

    if (list.length > 0) {
        for (let f of list) {
            if (foundbd == true) {
                break;
            }
            if (f.name == fs.name) {
                deleteItem(bm.name, f.urls);
                foundbd = true;
            } else {
                foundbd = delBookmark(fs, bm, f.folders, foundbd);
            }
        }
    }

    return foundbd;

}

showImpExp.addEventListener('click', showImportExport);

function showImportExport() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgFolder.innerHTML = '';
    msgFF.innerHTML = '';
    if (areIEShown == false) {
        showImpExp.setAttribute('class', 'open');
        showFolder.setAttribute('class', 'buttons');
        showBookmark.setAttribute('class', 'buttons');
        showFoldersSaved.setAttribute('class', 'buttons');
        emptyLists();
        addBookmarkShow = false;
        addFolderShow = false;
        areFoldersShown = false;
        areIEShown = true;
        form.style.display = 'none';
        formFolder.style.display = 'none';
        folderList.style.display = 'none';
        impExp.style.display = 'block';
    } else {
        showImpExp.setAttribute('class', 'buttons');
        areIEShown = false;
        impExp.style.display = 'none';
    }
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
    bookmark.value = '';
    folder.value = '';
    listOfFolders = [];
    listOfFN = [];
    listOfBN = [];
    // se il file è vuoto da errore, magari catch?
    readJSONFile("./bookmarkstaxonomy.json", function(json){
        let data = JSON.parse(json);
        let listOfFoldersSerialized = JSON.stringify(data);
        localStorage.setItem("folderList", listOfFoldersSerialized);
        listOfFolders = JSON.parse(localStorage.getItem("folderList"));
        let valid = true;
        if (listOfFolders.length > 0) {
            valid = checkFolders(listOfFolders, valid);
        } else {
            valid = false;
        }
        let sameN = false;
        if (valid) {
            sameN = saveNames(listOfFolders, sameN);
            if (sameN == false){
                let listOfFNSerialized = JSON.stringify(listOfFN);
                localStorage.setItem("folderNames", listOfFNSerialized);
                let listOfBNSerialized = JSON.stringify(listOfBN);
                localStorage.setItem("bookmarkNames", listOfBNSerialized);
                succImp.style.display = 'block';
                msgImp.innerHTML = 'The bookmarks have been imported successfully';
            }
        } 
        if (valid == false || sameN) {
            succImp.style.display = 'block';
            msgImp.innerHTML = 'The bookmarks imported are not valid';
            listOfFolders = [];
            listOfFN = [];
            listOfBN = [];
            let listOfFoldersSerialized = JSON.stringify(listOfFolders);
            localStorage.setItem("folderList", listOfFoldersSerialized);
            let listOfFNSerialized = JSON.stringify(listOfFN);
            localStorage.setItem("folderNames", listOfFNSerialized);
            let listOfBNSerialized = JSON.stringify(listOfBN);
            localStorage.setItem("bookmarkNames", listOfBNSerialized);
        }
    })
}

function saveNames(list, sameN) {
    if (list.length > 0) {
        for (let f of list) {
            if (listOfFN.length > 0) {
                for (let fn of listOfFN) {
                    if (fn == f.name) {
                        sameN = true;
                        break;
                    }
                }
            }
            if (sameN == false) {
                listOfFN.push(f.name);
                if (f.urls.length > 0) {
                    for (let b of f.urls) {
                        if (listOfBN.length > 0) {
                            for (let bn of listOfBN) {
                                if (bn == b.name) {
                                    sameN = true;
                                    break;
                                }
                            }
                        }
                        if (sameN == false) {
                            listOfBN.push(b.name);
                        } else {
                            break;
                        }
                    }
                }
            } else {
                break;
            }
            sameN = saveNames(f.folders, sameN); 
        }
    }
    return sameN;
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
    succExp.style.display = 'block';
}

delSuccImp.addEventListener('click', deleteSuccImp);

function deleteSuccImp() {
    succImp.style.display = 'none';
}

delSuccExp.addEventListener('click', deleteSuccExp);

function deleteSuccExp() {
    succExp.style.display = 'none';
}

function checkBookmarks(bms, fname) {
    let valid = true;
    for (let b of bms) {
        if (b.url == false || b.name == false || b.folder != fname || b.url == undefined || b.name == undefined) {
            valid = false;
            break;
        }
    }
    return valid;
}

function checkFolders(fds, valid) {
    for (let f of fds) {
        if ( !(Array.isArray(f.urls)) || f.name == false || !(Array.isArray(f.folders)) ||
            !(f.open === false || f.open === true) || f.name == undefined) {
            valid = false;
            break;
        }
        if (f.folders.length > 0) {
            valid = checkFolders(f.folders, valid);
        }
        if (f.urls.length > 0) {
            valid = checkBookmarks(f.urls, f.name);
        }
    }
    return valid;
}
