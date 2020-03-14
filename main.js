// Please edit favorite heading
var Heading_list = [
  ["=*=*=*=*=*| ", " |=*=*=*=*="], // Heading
  ["=== ", " ==="] // SubHeading
];

define(function (require, exports, module) {
  "use strict";
  
  /*=*=*=*=*=*| Module |=*=*=*=*=*/
  var CommandManager = brackets.getModule("command/CommandManager"),
  KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
  AppInit = brackets.getModule("utils/AppInit"),
  Menus = brackets.getModule("command/Menus");
  var DocumentManager = brackets.getModule("document/DocumentManager");
  var EditorManager = brackets.getModule("editor/EditorManager");
  var LanguageManager = brackets.getModule("language/LanguageManager");
  /*=*=*=*=*=*| Module |=*=*=*=*=*/
  
  
  /*=*=*=*=*=*| Extension |=*=*=*=*=*/
  /*=== Extension - Common ===*/
  function Heading_gene(Heading_left, Heading_right){
    var currentDoc = DocumentManager.getCurrentDocument();
    var editor = EditorManager.getCurrentFullEditor();
    
    //Comment by the Language
    var language = currentDoc.getLanguage();
    var cmt_prefix = language.getBlockCommentPrefix();
    var cmt_suffix = language.getBlockCommentSuffix();
    var cmt_line = language.getLineCommentPrefixes();
    if(cmt_prefix == null){
      if(cmt_line[0] != null){
        cmt_prefix = cmt_line[0];
      }else{
        cmt_prefix = "";
      }
    }
    if(cmt_suffix == null){
      cmt_suffix = "";
    }
    
    var pos = editor.getCursorPos();
    
    // Heading shaping
    var selectedText = editor.getSelectedText();
    var isSelect = false;
    if (selectedText.length > 0) {
      isSelect = true;
    }
    if(isSelect){
      var heading_text = editor.getSelectedText();
      var selection = editor.getSelection();
      var start_pos = selection.start;
      var end_pos = selection.end;
    }else{
      var heading_text = String(currentDoc.getLine(pos.line));
      if(heading_text.match(/^\s/g)){
        if(heading_text.search(/\S/g) == -1){
          var tab_count = heading_text.length;
        }else{
          var tab_count = heading_text.search(/\S/g);
        }
      }else{
        var tab_count = 0;
      }
      var line_length = heading_text.length;
      var start_pos = {line:pos.line, ch:tab_count};
      var end_pos = {line:pos.line, ch:line_length};
      heading_text = heading_text.slice(tab_count);
    }
    
    // Heading generation
    currentDoc.batchOperation(function(){
      currentDoc.replaceRange(cmt_prefix + Heading_left + heading_text + Heading_right + cmt_suffix, start_pos, end_pos);
    });
  }
  /*=== Extension - Common ===*/
  
  /*=== Extension - Heading ===*/
  var HD_CMD_ID  = "Heading.add";
  var HD_MENU_NAME   = "Add Heading";
  
  function addHeading(){
    Heading_gene(Heading_list[0][0], Heading_list[0][1]);
  }
  /*=== Extension - Heading ===*/
  
  /*=== Extension - SubHeading ===*/
  var SHD_CMD_ID  = "SubHeading.add";
  var SHD_MENU_NAME   = "Add SubHeading";
  
  function addSubHeading(){
    Heading_gene(Heading_list[1][0], Heading_list[1][1]);
  }
  /*=== Extension - SubHeading ===*/
  
  
  /*=*=*=*=*=*| Add menu |=*=*=*=*=*/
  // Heading
  CommandManager.register(HD_MENU_NAME, HD_CMD_ID, addHeading);
  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuItem(HD_CMD_ID);
  
  // SubHeading
  CommandManager.register(SHD_MENU_NAME, SHD_CMD_ID, addSubHeading);
  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuItem(SHD_CMD_ID);
  
  menu.addMenuDivider();
  
  
  /*=*=*=*=*=*| Shortcut Key |=*=*=*=*=*/
  KeyBindingManager.addBinding(HD_CMD_ID, "Shift-Ctrl--");
  KeyBindingManager.addBinding(SHD_CMD_ID, "Alt-Ctrl--");
});
