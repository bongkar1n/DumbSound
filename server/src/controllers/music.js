const {song, artist, user} = require("../../models")

exports.addArtist = async (req, res) => {
    try {
      const { userId } = req;

        const data = req.body

        const adminCheck = await user.findOne({
          where: {
            id: userId
          }
        })

        if(!adminCheck.listAs == 1){
          res.send({
            status: "failed to access",
            message: "you dont have access"
          })
        }

        const dataArtist = await artist.create({
            ...data,
          });

          const showArtist = await artist.findOne({
            where: {
              id: dataArtist.id,
            },
        })

            res.send({
                status: "success",
                message: "successfully add artist",
                data: showArtist
              });


    } catch (error) {
        console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
    }
}


exports.addSong = async(req, res) => {
  try {
    
    const data = req.body
    const songCover = req.files.imageFile[0].filename;
    const songs = req.files.audioFile[0].filename;

    const addData = await song.create({
      ...data,
      thumbnail: songCover,
      file: songs
    })

    const addedMusic = await song.findOne({
      where: {
        id: addData.id
      }
    })

    console.log(req.files);

    res.send({
      status: "success",
      message: "successfully added music",
      data: addedMusic
    })
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
}


exports.getSongs = async (req, res) => {
  try {
    const allData = await song.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: artist,
        as: "singer",
        attributes: ["id", "name"]
      }
    })

    res.send({
      status: 'success',
      message: 'successfully get all songs',
      data: allData
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: "Failed",
      message: "Server Error"
    })
  }
}


exports.getArtists = async (req, res) => {
  try {
    const allData = await artist.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      message: 'successfully get all artist',
      data: allData
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: "Failed",
      message: "Server Error"
    })
  }
}