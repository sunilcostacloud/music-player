import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Box, Card, CardContent, Grid, LinearProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMusic } from "../redux/actions/musicActions";
import ReactApexChart from "react-apexcharts";

const Charts = () => {
  const dispatch = useDispatch();

  const music = useSelector((state) => state.music);
  const { isLoading, isError, error, isSuccess, data } = music.getMusic;

  const genreCounts = {};
  const movieCounts = {};
  const singerCounts = {};

  data?.music?.forEach((item) => {
    const genre = item.genre.toLowerCase();
    const movie = item.movie.toLowerCase();
    const singer = item.singer.toLowerCase();

    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    movieCounts[movie] = (movieCounts[movie] || 0) + 1;
    singerCounts[singer] = (singerCounts[singer] || 0) + 1;
  });

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: Object.keys(genreCounts),
    },
  };

  const chartSeries = [
    {
      name: "Genre Count",
      data: Object.values(genreCounts),
    },
  ];

  const movieChartOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(movieCounts),
  };

  const movieChartSeries = Object.values(movieCounts);

  const singerChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: Object.keys(singerCounts),
    },
  };

  const singerChartSeries = [
    {
      name: "Singer Count",
      data: Object.values(singerCounts),
    },
  ];

  return (
    <>
      <Layout>
        {isLoading ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <LinearProgress sx={{ width: "100%", marginTop: "20px" }} />
          </Box>
        ) : isError ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4>{error}</h4>
          </Box>
        ) : isSuccess === true && data?.music?.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Data Found</h1>
          </Box>
        ) : isSuccess ? (
          <Box sx={{ width: "95%", margin: "auto", p: 2 }}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Card sx={{ background: "#F2EDD7" }}>
                  <CardContent>
                    <Box sx={{ textAlign: "center" }}>
                      <h4>Genre Chart</h4>
                    </Box>

                    <ReactApexChart
                      options={chartOptions}
                      series={chartSeries}
                      type="bar"
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6}>
                <Card sx={{ background: "#F2EDD7" }}>
                  <CardContent>
                    <Box sx={{ textAlign: "center" }}>
                      <h4>Movie Chart</h4>
                    </Box>

                    <ReactApexChart
                      options={movieChartOptions}
                      series={movieChartSeries}
                      type="pie"
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6}>
                <Card sx={{ background: "#F2EDD7" }}>
                  <CardContent>
                    <Box sx={{ textAlign: "center" }}>
                      <h4>Singer Chart</h4>
                    </Box>

                    <ReactApexChart
                      options={singerChartOptions}
                      series={singerChartSeries}
                      type="line"
                      height={200}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default Charts;
