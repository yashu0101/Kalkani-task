import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Arrow from "@mui/icons-material/ArrowForwardTwoTone";
import { Button, Divider, TextField, Typography } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
const TestPagination = () => {
  const [data, setData] = useState();
  const [allCount, setAllCount] = useState();
  const [search, setSearch] = useState(false);
  const [count, setCount] = useState(15);
  const [page, setPage] = useState(0);
  const [sparameter, setSparameter] = useState();
  const [isdata, setisData] = useState(true);

  const next = () => {
    setPage(page + 1);
    setCount(count + 15);
  };
  const previous = () => {
    if (page != 0) {
      setPage(page - 1);
    }
    if (count != 15) {
      setCount(count - 15);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=${count}&q=&order_by=favorites&sort=desc`
      )
      .then((resp) => {
        setAllCount(resp?.data?.pagination?.items?.total);
        setData(resp?.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [count, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSparameter(value);
    console.log("value", value.length);
    if (value.length > 2) {
      setSearch(true);
    } else setSearch(false);
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      axios
        .get(
          `https://api.jikan.moe/v4/characters?page=${page}&limit=${allCount}&q=${sparameter}&order_by=favorites&sort=desc`
        )
        .then((resp) => {
          setData(resp?.data?.data);
        })
        .catch((err) => {
          setisData(false);
          console.log("err", err);
        });
    }, 800);
    return () => clearTimeout(timerOut);
  }, [sparameter]);

  return (
    <>
      <Box
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/645/836/891/the-witcher-the-witcher-3-wild-hunt-yennefer-of-vengerberg-triss-merigold-wallpaper-thumb.jpg')",
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <h1
                style={{
                  color: "#fff",
                  marginTop: "100px",
                  alignItems: "center ",
                  fontStyle: "italic",
                }}
              >
                Search Anime Characters
              </h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search"
                name="search"
                onChange={handleChange}
                sx={{
                  border: "1px solid #fff",
                  backgroundColor: "#ccc",
                  marginTop: "10px",
                  marginBottom: 2,
                }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3} md={4} lg={4}>
              <Button variant="contained" color="primary" onClick={previous}>
                Prev
              </Button>
            </Grid>
            <Grid item sx={6} md={4} lg={4}>
              <Typography align="center" style={{ color: "#fff" }}>{`Total ${
                search ? data.length : allCount
              }  anime`}</Typography>
            </Grid>
            <Grid item xs={3} md={4} lg={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={next}
                sx={{ marginLeft: 2 }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>

        <Divider
          sx={{
            border: "1px solid #000",
            marginTop: 20,
            marginBottom: 10,
          }}
        />
      </Box>
      <Box>
        <Container
          sx={{
            marginTop: 10,
          }}
        >
          {Array.isArray(data) && data.length != 0 ? (
            data.map(
              ({ mal_id, name, images, url, nicknames, favorites }, i) => (
                <Box
                  key={i}
                  sx={{
                    border: "2px solid #000",
                    marginTop: 2,
                  }}
                >
                  <Grid container key={mal_id + i}>
                    <Grid sx={{ marginRight: "15px" }}>
                      <img
                        src={images.jpg.image_url}
                        style={{
                          width: "150px",
                          height: "120px",
                          margin: "8px",
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <h1>{name}</h1>
                      </div>
                      <Grid key={i} sx={{ display: "flex" }}>
                        {Array.isArray(nicknames) &&
                          nicknames.map((name, i) => (
                            <div
                              key={i}
                              style={{
                                width: "auto",
                                border: "1px solid #000",
                                borderRadius: "4px",
                                marginLeft: 4,
                                backgroundColor: "#ccc",
                                padding: "3px",
                              }}
                            >
                              {name}
                            </div>
                          ))}
                      </Grid>
                    </Grid>

                    <Grid sx={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "20px",
                          justifyContent: "center",
                          marginRight: "15px",
                        }}
                      >
                        <FavoriteRoundedIcon
                          color="error"
                          variant="contained"
                        />
                        {favorites}
                      </div>
                      <div
                        style={{
                          borderLeft: "2px solid black",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <a href={`${url}`} target="_blank">
                          <Arrow style={{ fontSize: "80px" }} />
                        </a>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              )
            )
          ) : (
            <h1>page not Found</h1>
          )}
        </Container>
      </Box>
    </>
  );
};

export default TestPagination;
