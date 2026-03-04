//By CheeseNeko
//Without Deepseek!!!
const UpdateTime = '2026/3/4'
function AngleToRad(angle){//角度转弧度
  return Math.PI*angle/180
}

function StringObjectToObject(strobj){//字符串类型object转object
  if (isNaN(strobj) && typeof(strobj) == 'string'){
    return strobj.replace(/'|"|]/g, '').replace('[', '').split(',')
  }else{
    return strobj
  }
}

function IsNumber(String){
  if (isNaN(String)){
    return 0
  }else{
    return (String)
  }
}

function calculat(expr) {
    const sanitized = expr.replace(/[^0-9+\-*/().,]/g, '');
    return new Function('return ' + sanitized)();
}

function VectorCalculat(V1,V2,symbol){//向量计算核心算法
  if(V1 === '' || V2 === '') return('empty vector')
    if(typeof(V1) == 'object' && typeof(V2) == 'object'){//向量和向量
      if(symbol === '^') return ('invalid symbol')
        let count = Math.max(V1.length,V2.length);
        let result = 0
            if (symbol === '*' || symbol === '/') {
                result = 0
            }else{
                result = []
            }
        for(let i=0;i < count;i++){
            if (symbol === '*' || symbol === '/') {
                result += calculat(IsNumber(String(V1[i])) + symbol + IsNumber(String(V2[i])))
            }else{
                result.push(calculat(IsNumber(String(V1[i])) + symbol + IsNumber(String(V2[i]))))
            }
        }
        return result;
    }else{//向量和数字
      if (symbol === '^'){
        let count = V1.length
        let result = 0
        for (let i = 0; i < count; i++){
          result += V1[i]**V2
        }
        return result;
      }else{
        if(symbol === '+' || symbol === '-') return('invalid symbol')
        let count = V1.length
        let result = []
        for (let i=0;i < count;i++){
            result.push(calculat(IsNumber(String(V1[i])) + symbol + V2))
        }
        return result;
      }
    }
}

(function (Scratch) {
  "use strict";
  class VectorCalculator {
    getInfo() {
      return {
        id: "VectorCalculator",
        name: "向量计算器",
        blocks: [
          {
            opcode: "GenerateVector",
            blockType: Scratch.BlockType.REPORTER,
            text: "以[angle]度生成模长为[mold]的二维向量",
            arguments: {
              angle: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: '0',
              },
              mold: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
              }
            },
          },

          {
            opcode: "VectorAngle",
            blockType: Scratch.BlockType.REPORTER,
            text: "向量[vector]的角度",
            arguments: {
              vector: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
            },
          },

          {
            opcode: "VectorMold",
            blockType: Scratch.BlockType.REPORTER,
            text: "向量[vector]的模",
            arguments: {
              vector: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: "下列积木支持高维向量计算",
          },

          {
            func: "method",
            blockType: Scratch.BlockType.BUTTON,
            text: "用法",
          },

          {
            opcode: "VectorAdd",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1]+[V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,4]',
              },
            },
          },

          {
            opcode: "VectorDec",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1]-[V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,4]',
              },
            },
          },

          {
            opcode: "VectorMul",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1]*[V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,4]',
              },
            },
          },

          {
            opcode: "VectorDiv",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1]/[V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,4]',
              },
            },
          },

          {
            opcode: "VectorInd",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1]^[V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '3',
              },
            },
          },

          {
            opcode: "VectorHandle",
            blockType: Scratch.BlockType.REPORTER,
            text: "[V1][method][V2]",
            arguments: {
              V1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2]',
              },
              V2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,4]',
              },
              method: {
                type: Scratch.ArgumentType.MENU,
                menu: 'symbol',
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: "———————————————————————————————————",//我是分割线
          },

          {
            opcode: "PolarCoordinateTransformation",
            blockType: Scratch.BlockType.REPORTER,
            text: "将极坐标([r],[θ])转换为坐标",
            arguments: {
              r: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '4',
              },
              θ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '30',
              },
            },
          },

          {
            opcode: "Meow",
            blockType: Scratch.BlockType.REPORTER,
            text: "喵~",
          },

        ],
        menus: {
          symbol:{
            acceptReporters: true,
            items: ('+,-,*,/,^').split(','),
          },
        }
      };
    }
    GenerateVector(args) {
      return ('[' + Math.cos(AngleToRad(args.angle))*args.mold + ',' + Math.sin(AngleToRad(args.angle))*args.mold + ']')
    }
    VectorAngle(args){
      let vec = StringObjectToObject(args.vector)
      return Math.atan(vec[1]/vec[0])*180/Math.PI
    }

    VectorMold(args){
      let vec = StringObjectToObject(args.vector)
      return Math.sqrt(vec[0]**2 + vec[1]**2)
    }

    VectorAdd(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),'+'));
    }

    VectorDec(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),'-'));
    }

    VectorMul(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),'*'));
    }

    VectorDiv(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),'/'));
    }

    VectorInd(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),'^'));
    }

    VectorHandle(args){
      return(VectorCalculat(StringObjectToObject(args.V1),StringObjectToObject(args.V2),args.method));
    }

    PolarCoordinateTransformation(args){
      return (Math.cos(AngleToRad(args.θ))*args.r + ',' + Math.sin(AngleToRad(args.θ))*args.r)
    }
    
    Meow(){
      return (`By CheeseNeko\nUpdate At ${UpdateTime}`)
    }

    method(){
      return window.alert("VectorCalculat(Array, Array | Number, String): number | Array | 'empty vector' | 'invalid symbol'")
    }
  }
  Scratch.extensions.register(new VectorCalculator());
})(Scratch);