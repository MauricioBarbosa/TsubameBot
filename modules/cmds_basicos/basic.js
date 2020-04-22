const Discord = require('discord.js')

const basic =  {
    question: function(params){
        var obj;
        if(params!=undefined&&(params.length > 1||params.length==0)){
            obj = {
                Title : ':red_circle: **Error**: TooManyArgs', 
                Description : 'Argumentos inválidos para essa função, digite !help -question para mais informações',
                Type : 'ERROR'
            }
        }else{
            if(params[0].type=="TEXT"){
                var a = (Math.random() * 1); 
                var desc = a == 1 ? "Não":"Sim"
                obj = {
                    Title : '**'+params[0].value+'**', 
                    Description : desc,
                    Type : 'INFO'
                }
            }else{
                if(params[0].type=="PARAM"){
                    switch(params[0].value){
                        case 'help':
                            obj = {
                                Title : "**HELP !question**", 
                                Description : 'utilize o comando ```!question pergunta``` e envie uma pergunta para que eu responda!',
                                Type : 'INFO'
                            }
                        break;
                        default:
                            obj = {
                                Title : ':red_circle: **Error**: ParamNotFound', 
                                Description : 'A função não suporta o parametro especificado! digite !question -help para mais informações',
                                Type : 'ERROR'
                            }
                        break;
                    }
                }else{
                    obj = {
                        Title : ':red_circle: **Error**: InvalidArgs', 
                        Description : 'A função não suporta o parametro especificado! digite !question -help para mais informações',
                        Type : 'ERROR'
                    }
                }
            }
        }
        return obj;
    },

    fw : function(params){
        var obj;
        if(params.length === 1 && params[0].type == "TEXT"){
            obj = {
                Title : "",
                Description : params[0].value,
                Type : "INFO"
            }
        }else{
            var desc = "";
            var image = true;
            var imglnk="";
            var title = ""
            var hastitle = false;
            for(var i=0;i<params.length;i++){
                if(params[i].type=='TEXT'){
                    desc+=params[i].value
                }else{
                    if(params[i].value=='img'&&image&&
                    params[i+1]!=undefined&&params[i+1].type=='TEXT'){
                        if(params[i+1].value.startsWith('htt')){
                            imglnk = params[i+1].value;
                            image = false;
                        }
                        else{
                            return {
                                Title : ':red_circle: **Error**: InvalidLink', 
                                Description : 'O link aparentemente está inválido',
                                Type : 'ERROR'
                            }
                        }
                        i++;
                    }
                    else if(params[i].value=='t'&&!hastitle&&params[i+1]!=undefined&&params[i+1].type=='TEXT'){
                        title = params[i+1].value;
                        hastitle = true;
                        i++;
                    }else{
                        return {
                            Title : ':red_circle: **Error**: InvalidArgs', 
                            Description : 'A função não suporta o parametro especificado! digite !fw -help para mais informações',
                            Type : 'ERROR'
                        }
                        break;
                    }
                }
            }
            obj = {
                Title : title,
                Description : desc,
                Type : "INFO",
                Img : imglnk
            }
        }
        return obj;
    } 
}

module.exports={
    basic : basic
}

