const {user} = require("../../models")
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require('sequelize');

const secretKey = process.env.SECRET_KEY;


exports.registration = async (req, res) => {
    try {
    const data  = req.body;

    const { password, email } = req.body;

    const schema = joi.object({
        fullName: joi.string().min(6).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        gender: joi.any().valid("Male", "Female").required(),
        phone: joi.string().min(10).regex(/^[0-9]+$/).required(),
        address: joi.string().min(20).required()

    })
    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "Failed",
        message: "Email already registered",
      });
    }
    
    const hashStrenght = 10;

    const hashedPassword = await bcrypt.hash(password, hashStrenght);

    const dataUser = await user.create({
      ...data,
      listAs: 0,
      password: hashedPassword,
    });

    
    const token = jwt.sign(
        {
          id: dataUser.id,
        },
        secretKey
      );

    
    res.send({
        status: "success",
        data: {
            user: {
                fullName: dataUser.fullName,
                token,
            }
        }
      });
        
    } catch (error) {
        console.log(error),
      res.send({
        status: "Failed",
        message: "Server Error",
      });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = req.body;

        const schema = joi.object({
            email: joi.string().email().min(7).required(),
            password: joi.string().min(6).required(),
          });
      
          const { error } = schema.validate(data);
      
          if (error) {
            return res.send({
              status: "Validation Failed",
              message: error.details[0].message,
            });
          }
      
          const checkEmail = await user.findOne({
            where: {
              email,
            },
          });
      
          if (!checkEmail) {
            return res.send({
              status: "Failed",
              message: "Email and Password do not match",
            });
          }
          const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.send({
        status: "Failed",
        message: "Email and Password do not match",
      });
    }

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullName: checkEmail.fullname,
          email: checkEmail.email,
          listAs: checkEmail.listAs,
          gender: checkEmail.gender,
          token,
        },
      },
    });

        
    } catch (error) {
        console.log(error),
      res.send({
        status: "Failed",
        message: "Server Error",
      });
    }
}

exports.user = async (req, res) => {
    try {
        // const {id} = req.params
        const users = await user.sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });

        // const userData = await user.findOne({
        //     where: {
        //         id,
        //     },
        //     attributes: {
        //         exclude: ["createdAt", "updatedAt"]
        //     }
        // })
        
        res.send({
            status: "success",
            data: users
        })
        
    } catch (error) {
        console.log(error),
        res.send({
            status: "Failed",
            message: "Server Error"
        })
        
    }
}

exports.checkAuth = async (req, res) => {
  try {
    const { userId } = req;

    const dataUser = await user.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

