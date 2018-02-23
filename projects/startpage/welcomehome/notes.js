/**
 * gameplan:
 * cookies store notes in a format of note0 = "content" and timestamp0="timestamp";
 * divs are created and made using these.
 * 
 * website loads
 * cookies load and place
 * anytime a new note is made, edited, or deleted, cookies is updated.
 * okay thats it i think.
 * note editing can come later.
 */

/**
 * new gameplan:
 * notes are now objects. containing content and timestamp(which can now be stored up to the second).
 * the note objects will be stored in a notes[] array. this array is then serialied and stored into the cookie 'notes'
 * when the page loads, we get and unserialize the 'notes' cookie and then print each note simply by looping through the array.
 * 
 * i think thats much better. i dont know if JSON need a library tho im worried about that.
 * note editing becomes very easy though, just access its array and change its content.
 */

//creation of notes array.
var notes = [];
var form = document.getElementById("newnote");
if(getCookie("notes") != null) {
    notes = JSON.parse(getCookie("notes"));
}

/**
 * Contructor for Note object.
 * @param {content of note} content 
 * @param {timestamp of note creation} timestamp 
 */
function Note(content, timestamp) {
        this.content = content;
        this.timestamp = timestamp;
}

/**
 * Function to create a new note from content of 'notetaker' textbox.
 * Will not create a new note without content.
 */
  function newNote() { 
    var textbox = document.getElementById("notetaker");                 //get textbox           
    var time = montharray[month]+" "+daym+" "+checkHour(h)+":"+m+ampm;  //gets time


    if(textbox.value == "") return;
    notes.push(new Note(textbox.value, time));                          //pushes a new note object to notes array
    printNotes();                                                       //prints Notes to save
    textbox.value = "";
}

/**
 * deletes a note from notes[] at specified index
 * @param {index of note to be deleted} index 
 */
function deleteNote(index) {
    notes.splice(index, 1);
    printNotes();
}
 /**
  * loads document cookie and prints saved notes.
  */
function printNotes() {
    clearNotes();
    for(var i = 0; i < notes.length; i++) {
        //variables for note context and timestamp
        var content = notes[i].content;
        var timestamp = notes[i].timestamp;
        //create note spans and paragraphs, indentify 'notes' div
        var notespan = document.createElement('div');
        var dashspan = document.createElement('div');
        var contentP = document.createElement('p');
        var timestampP = document.createElement('p');
        var notesdiv = document.getElementById("notes")
        //give classes and id's to each
        //class:    [note, content, timestamp]
        //id:       [note+i, content+i, timestamp+i]
        notespan.setAttribute("class", "note");
        notespan.setAttribute("id", "note" + i);
        dashspan.setAttribute("class", "bullet");
        dashspan.setAttribute("id", "dash" + i);
        contentP.setAttribute("class", "content");
        contentP.setAttribute("id", "content" + i);
        timestampP.setAttribute("class", "timestamp");
        timestampP.setAttribute("id", "timestamp" + i);
        //prepend 'note' span to 'notes' div, append 'content' and 'timestamp' paragraphs to 'note' span.
        notesdiv.insertBefore(notespan, notesdiv.firstChild);
        notespan.appendChild(dashspan);
        notespan.appendChild(contentP);
        notespan.appendChild(timestampP);
        //set content and timestamp
        contentP.innerHTML = content;
        timestampP.innerHTML = timestamp;
    }

    /**
     * clears notespace for fresh printing.
     */
    function clearNotes() {
        var notesdiv = document.getElementById("notes");
        var rmnotes = document.getElementsByClassName("note");
        var  numNotes = rmnotes.length;
        for(i = 0; i < numNotes ; i++) {
            notesdiv.removeChild(rmnotes[0]);
        }
    }
    //save notes to cookie
    document.cookie = "notes=" + JSON.stringify(notes);
}

/**
 * gets cookie value by name
 * @param {name of cookie to be retrieved} name 
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return null;
  }