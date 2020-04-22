const Discord = require('discord.js')

const types = {
    ERROR : 0xE60004, 
    INFO : 0x112AED, 
    IMAGE : 0x000000
}
// this class generates a MessageEmbed Object
const generators = {

    messageEmbed : function(obj){
        var msg = new Discord.MessageEmbed()
        .setDescription(obj.Description);
        switch(obj.Type){
            case 'ERROR':
                msg.setColor(types.ERROR);
            break;
            case 'INFO':
                msg.setColor(types.INFO);
            break;
            default:
            break;
        }
        if(obj.Title!=""){
            msg.setTitle(obj.Title)
        }
        if(obj.hasOwnProperty('Img')){
            msg.setImage(obj.Img)
        }

        return msg;
    },

    messageEmbedImage:function(obj){
        var msg = new Discord.MessageEmbed() 
    }
}

module.exports={
    generators : generators
}