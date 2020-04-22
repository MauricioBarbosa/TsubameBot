const Ba = require('../modules/cmds_basicos/basic');
const Gen = require('../modules/cmds_basicos/generator');


var _str = ""; 

// command parser part 1 - creating tokens

const solve = {
    STR_DELIMITER : " ", 
    STR_PARAM_INIT : '|',
    STR_COMMAND_FLAG : '!', 
    STR_PARAM_DELIMITER : '-',
    STR_IS_ARG : false,
    STR_IS_DESCRIPTION : false,
    commandParser : function(str){
        if(!str){
            throw {
                title : "TypeError",
                msg : "não é uma string"
            }
        }else{
            _str = str;
            var isComand = true; 
            var c = this.getChar(_str)
            var sub = "";
            var arr_args=[];
            while(_str.length>0){
                while((this.STR_IS_DESCRIPTION||c!=this.STR_DELIMITER)&&c!=this.STR_PARAM_INIT&&
                    c!=""){
                    sub += c;
                    _str = this.eatString(_str)
                    c = this.getChar(_str)
                    if(this.STR_IS_DESCRIPTION&&(_str.charAt(1)==this.STR_PARAM_DELIMITER||
                    _str.charAt(1)==this.STR_COMMAND_FLAG||_str.charAt(1)=='"')){
                        c = ""
                    }
                }
                if(c==this.STR_DELIMITER||c==this.STR_PARAM_INIT||c==""){
                    if(sub!=""){
                        if(sub.startsWith('!')){
                            arr_args.push({
                                type : "CMD", 
                                value : sub
                            })
                        }else{
                            if(sub.startsWith('-')){
                                if(sub.charAt(1)=='-'){
                                    sub = sub.slice(2);
                                    arr_args.push({
                                        type : "SUBPARAM",
                                        value : sub
                                    })
                                }else{
                                    sub = sub.slice(1);
                                    arr_args.push({
                                        type : "PARAM", 
                                        value : sub
                                    })
                                }
                            }else{
                                if(this.STR_IS_DESCRIPTION){
                                    arr_args.push({
                                        type : "TEXT", 
                                        value : sub
                                    })
                                    this.STR_IS_DESCRIPTION = false
                                }
                            }
                        }
                    }else{
                        if(c === this.STR_PARAM_INIT){
                            this.STR_IS_ARG = true
                            this.STR_IS_DESCRIPTION = false;
                        }
                        
                    }
                    if(_str.charAt(1)!='-'&&_str.charAt(1)!=' '&&_str.charAt(1)!='!'
                    &&_str!=""&&_str.charAt(1)=='"'){
                        this.STR_IS_DESCRIPTION = true;
                    }
                    _str = this.eatString(_str)
                    c = this.getChar(_str);
                    sub = "";
                }
            }
            return arr_args;
        }
    },


    getChar : function(str){
        c = "";
        var c = str.charAt(0);
        return c;
    },

    eatString : function(_str){
        var subs = "";
        for(var i = 0 ; i < _str.length; i++){
            subs += _str.charAt(i + 1)
        }
        return subs;
    }

}

const execute = { //read the command and execute 
    executeCommand : function(args){// This function receives the message and trace routes to parse the command
        var res = "";
        try{
            var arr_args = solve.commandParser(args)
            if(this.verifyStartComands(arr_args)){
                var cmd = arr_args.splice(0,1);
                res = this.verifyCommand(cmd,arr_args)
                return Gen.generators.messageEmbed(res)
            }
        }catch(err){
            return Gen.generators.messageEmbed({
                Title : err.title, 
                Description : err.msg,
                Type : 'ERROR'
            })
        }
    },

    verifyStartComands : function(arr){
        var count = 0;
        arr.forEach(element => {
            if(element.type=='CMD')
                count++;
        });
        return count === 1;
    }, 
    // Get the tokens and redirect to the correct function
    verifyCommand : function(cmd,params){
        switch(cmd[0].value){
            case '!question':
                return Ba.basic.question(params);
            break;
            case '!fw':
                return Ba.basic.fw(params);
            break;
            default:
                return {
                    Title : ':red_circle: **Error**: CommandNotFoundException', 
                    Description : 'não consegui encontrar o comando', 
                    Type : 'ERROR'
                }
            break;
        }
    }
}

module.exports = {
    execute : execute
}