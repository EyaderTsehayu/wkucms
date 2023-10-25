import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';

const faq = [
    {
        q: "From where does our office start?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        q: "Who holds the position of the dean at our college?",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "From where does our office start?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        q: "Who holds the position of the dean at our college?",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "From where does our office start?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        q: "Who holds the position of the dean at our college?",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "From where does our office start?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        q: "Who holds the position of the dean at our college?",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "From where does our office start?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        q: "Who holds the position of the dean at our college?",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
];

const Faq = () => {
    const cardStyle = {
        maxWidth: "100vh",
        borderColor: '#F5F7F8',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderRadius: "15px",
        marginRight: "15px",
        backgroundColor: "#F5F7F8"
    };
    return (
        <div style={{ marginBottom: '80px' }}>

            <Grid container spacing={2} sx={{
                marginTop: "20px"
            }}>
                {faq.map(freq => (
                    <Grid xs={6} md={4} >

                        <Accordion className="dark:bg-body dark:border-body my-12" sx={cardStyle}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='dark:text-white'>{freq.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className='dark:text-white'
                                    style={{
                                        fontSize: '18px', // Custom font size
                                        fontStyle: "italic",

                                    }}
                                >
                                    {freq.ans}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>


                    </Grid>



                ))}
            </Grid>

        </div>




    );
}
export default Faq