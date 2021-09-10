import React, { useState, useEffect, useRef } from "react";

// dashboard components
import StatisticsCard from "../../components/StatisticsCard/StatisticsCard";
import SummaryPanel from "../../components/SummaryPanel/SummaryPanel";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import BarChart from "../../components/BarChart/BarChart";

// api hooks
import { getFastestUserToCompleteCourse } from "../../hooks/getFastestUserToCompleteCourse";
import { getAverageTimeToCompleteCourse } from "../../hooks/getAverageTimeToCompleteCourse";
import { getMostAttemptedCourse } from "../../hooks/getMostAttemptedCourse";
import { getLeastAttemptedCourse } from "../../hooks/getLeastAttemptedCourse";
import { getUserAttemptPerMonthDistribution } from "../../hooks/getUserAttemptPerMonthDistribution";
import { getUserAttemptPerCourseDistribution } from "../../hooks/getUserAttemptPerCourseDistribution";
import { getFastestSubmissions } from "../../hooks/getFastestSubmissions";
import { getMostSubmissions } from "../../hooks/getMostSubmissions";
import { getRecentSubmissions } from "../../hooks/getRecentSubmissions";

// material imports
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// styling container
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 1064,
        margin: 'auto',
        overflow: 'hidden',
      
    },
    wrapper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '90%'
    },
    paper: {
        width: '100%'
    },
    title: {
      width: 310,
      fontSize: 16,
      fontWeight: 500,
      padding: theme.spacing(2, 0)
    }
}));

const Insights = () => {

    const classes = useStyles();

    const [fastestUser, setFastestUser] = useState([]);
    const [avgTime, setAvgTime] = useState(0);
    const [mostAttemptedCourse, setMostAttemptedCourse] = useState([]);
    const [leastAttemptedCourse, setLeastAttemptedCourse] = useState([]);

    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);

    const [fastestSubmissions, setFastestSubmissions] = useState([]);
    const [mostSubmissions, setMostSubmissions] = useState([]);
    const [recentSubmissions, setRecentSubmissions] = useState([]);
    
    const componentIsMounted = useRef(true);

    // fetching fastest user to complete a course
    useEffect(() => {
        getFastestUserToCompleteCourse()
        .then(response => {
            if (componentIsMounted.current) {
                setFastestUser(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching average time to complete a course
    useEffect(() => {
        getAverageTimeToCompleteCourse()
        .then(response => {
            if (componentIsMounted.current) {
                setAvgTime(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching most attempted course
    useEffect(() => {
        getMostAttemptedCourse()
        .then(response => {
            if (componentIsMounted.current) {
                setMostAttemptedCourse(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching least attempted course
    useEffect(() => {
        getLeastAttemptedCourse()
        .then(response => {
            if (componentIsMounted.current) {
                setLeastAttemptedCourse(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching users attempt per month distribution
    useEffect(() => {
        getUserAttemptPerMonthDistribution()
        .then(response => {
            if (componentIsMounted.current) {
                setBarData(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching users attempt per course distribution
    useEffect(() => {
        getUserAttemptPerCourseDistribution()
        .then(response => {
            if (componentIsMounted.current) {
                setPieData(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching users with fastest courses completion time
    useEffect(() => {
        getFastestSubmissions()
        .then(response => {
            if (componentIsMounted.current) {
                setFastestSubmissions(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching users with most courses attempted
    useEffect(() => {
        getMostSubmissions()
        .then(response => {
            if (componentIsMounted.current) {
                setMostSubmissions(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    // fetching recent submissions
    useEffect(() => {
        getRecentSubmissions()
        .then(response => {
            if (componentIsMounted.current) {
                setRecentSubmissions(response);
            }
        })
        .catch(err => {
            console.log(err);
        });
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    return (
        <div style={{  width: '100%' }} className={classes.root}>
        <Grid container spacing={3}>
        
            {/* Statistics Card */}
            <Grid item xs={12} sm={6} lg={3}>
                <StatisticsCard title={"Fastest user to complete a course"} value={fastestUser.user_lastname + ", " + fastestUser.user_firstname}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatisticsCard title={"Average course completion time"} value={avgTime + " days"} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatisticsCard title={"Most attempted course"} value={mostAttemptedCourse.course_title} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatisticsCard title={"Least attempted course"} value={leastAttemptedCourse.course_title} />
            </Grid>

            {/* Distribution Charts */}        
            <Grid item xs={12} sm={12} md={8} style={{marginBottom: "10px"}}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>User attempts per month distribution</Typography>
                <Paper className={classes.wrapper}>
                    <BarChart data={barData}/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{marginBottom: "10px"}}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>User per course distribution</Typography>
                <Paper className={classes.wrapper}>
                    <DoughnutChart data={pieData}/>
                </Paper>
            </Grid>
        
            {/* Recent Activities */}
            <Grid item xs={12} sm={12} md={4}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Recent submissions</Typography>
                <div className={classes.paper}>
                    {recentSubmissions.map((item) => (
                        <SummaryPanel key={item.id} data={item} titleKey={"course_name"} subHeader={"Submitted at"} />
                    ))}

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Fastest submissions</Typography>
                <div className={classes.paper}>
                    {fastestSubmissions.map((item) => (
                        <SummaryPanel key={item.id} data={item} titleKey={"course_name"} subHeader={"Completion time"} />
                    ))}
                </div>
               
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Most submissions</Typography>
                <div className={classes.paper}>
                    {mostSubmissions.map((item) => (
                        <SummaryPanel key={item.id} data={item} subHeader={"Total courses attempted"} />
                    ))}

                </div>
            </Grid>


        </Grid>
        
        </div>
    );
};

export default Insights;