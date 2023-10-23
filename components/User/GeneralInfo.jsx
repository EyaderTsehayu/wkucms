import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Paper, styled } from '@mui/material';

const genInfo = [
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
];







const GeneralInfo = () => {
    const cardStyle = {
        maxWidth: "100vh",
        borderColor: 'white',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderRadius: "15px",
        marginRight: "15px"
    };

    return (

        <Grid container spacing={2} sx={{
            marginTop: "20px", justifyContent: "center"
        }}>
            {genInfo.map(info => (
                <Grid xs={6} md={4}>


                    <Card className="dark:bg-body dark:border-body my-7" sx={cardStyle}>
                        <CardActionArea>
                            <CardContent >
                                <Typography className='dark:text-white' gutterBottom variant="h5" component="div">
                                    {info.title}
                                </Typography>
                                <Typography className='dark:text-white' variant="body2" color="text.secondary">
                                    {info.desc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {/* <Button size="small" color="primary">
                            Share
                        </Button> */}
                        </CardActions>
                    </Card>

                </Grid>
            ))}


        </Grid >








    );
}

export default GeneralInfo