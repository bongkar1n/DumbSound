const {transaction, user} = require('../../models')
const { QueryTypes } = require('sequelize');

exports.payment = async (req, res) => {
    try {
        const { userId } = req;
        const data = req.body;
        const image = req.files.imageFile[0].filename;

        // const dateToday = new Date().toJSON().slice(0,10)

        const date = new Date().getDate();
        const revDate = date < 10 ? `0${date}` : `${date}`;
        const month = new Date().getMonth() + 1;
        const revMonth = month < 10 ? `0${month}` : `${month}`; 
        const dueMonth = month >= 12 ? `0${month - 11}` : `0${month + 1}`;
        const year = new Date().getFullYear();
        const dueYear = month >= 12 ? `${year + 1}` : `${year}`;

        const today = `${revMonth}/${revDate}/${year}`;

        


        const uploadPayment = await transaction.create({
            ...data,
            startDate: today,
            dueDate: today,
            userId,
            proof: image,
            status: "Pending"
        })

        const paymentData = await transaction.findOne({
            where: {
                id: uploadPayment.id
            }
        })


        res.send({
            status: "success",
            message: "successfully add transaction",
            data: paymentData
          });



        
    } catch (error) {
        console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
    }
}

exports.getAllTransaction = async (req, res) => {
    try {
        
        
        const allTransaction = await transaction.findAll({
            attributes: {
                exclude: ["userId", "createdAt", "updatedAt"],
              },
              include: {
                model: user,
                as: "payment",
                attributes: ["id", "fullName"]
              }
        })

        res.send({
            status: "success",
            message: "successfully got all datas",
            data: allTransaction
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Failed"
        })
        
    }
}

exports.updatePayment = async (req, res) => {
    try {
        const {id} = req.params
        const { body } = req
        const findData = await transaction.findOne({
            where: {
            id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
        }})

        

        const update = await transaction.update( body, {
           where: {
               id: findData.id
           }
        })

        const showData = await transaction.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status: "Success",
            message: "Data Successfully Updated",
            data: showData
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}


exports.getTransactionById = async (req, res) => {
    try {
        const {id} = req.params
        const getData = await transaction.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status: "success",
            message: "successfully get data by id",
            data: getData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}


exports.getTransactionByIdUser = async (req, res) => {
    try {
        const { userId } = req;
        const getData = await transaction.findOne({
            where: {
                userId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status: "success",
            message: "successfully get data by User Id",
            data: getData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}