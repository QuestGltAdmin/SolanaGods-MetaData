import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Modal, ProgressBar } from "react-bootstrap";
import Layout from "../Component/Layout";
import { Headerhome } from "../Component/Headerhome";
import { getRemainingTimeUntilMsTimestamp } from "../helpers/Timer";
import { Footerhome } from "../Component/ui/Footerhome";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Chart } from "react-google-charts";
import axiosMain from "../http/axios/axios_main";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export const Homepage = () => {
  const { user, isUserAuthenticated } = useAuth();
  // console.log(user, isUserAuthenticated);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [things, setThings] = useState("1");
  const [copy, setCopy] = useState(false);
  const [tokenSold, setTokenSold] = useState(0);
  const [tokenSoldPercent, setTokenSoldPercentage] = useState(0);
  const [endTime, setEndTime] = useState(1717761598)

  useEffect(() => {
    getTimerDataEND();
    getTokenSold();
    getTimerData();
  }, []);

  useEffect(() => {
    const dateString1 = new Date();
    const date1 = new Date(dateString1);
    let timestamp1 = date1.getTime();
    // setCurrentTimeStamp(timestamp1);
    timestamp1 = timestamp1 / 1000;
    if (timestamp1 < endTime) {
      setShow(true);
    } else {
      setShow1(true);
    }
  }, []);
  //========================== fast bonous timer =======================//
  const [privateRemainingTimer, setPrivateRemainingTimer] = useState(defaultRemainingTime);

  const getTimerData = () => {
    let incressDay = new Date("2024-06-07T11:59:59.000Z");

    function updateRemainingTime(countdown) {
      setPrivateRemainingTimer(getRemainingTimeUntilMsTimestamp(countdown));
    }
    getRemainingTimeUntilMsTimestamp;
    let intervalId;
    intervalId = setInterval(() => {
      updateRemainingTime(Number(new Date(incressDay)));
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const [privateRemainingTimerEND, setPrivateRemainingTimerEND] = useState(defaultRemainingTime);
  const getTimerDataEND = () => {
    let incressDay = new Date("2024-07-07T11:59:59.000Z");

    function updateRemainingTimeEND(countdown) {
      setPrivateRemainingTimerEND(getRemainingTimeUntilMsTimestamp(countdown));
    }
    getRemainingTimeUntilMsTimestamp;
    let intervalId;
    intervalId = setInterval(() => {
      updateRemainingTimeEND(Number(new Date(incressDay)));
    }, 1000);
    return () => clearInterval(intervalId);
  };
  //========================== end of code =======================//
  // console.log(privateRemainingTimer);

  // useEffect(() => {
  // const getLocalData = localStorage.getItem("isCheckForModel");
  // console.log(getLocalData === "true");
  // if (!isUserAuthenticated) {
  // if (getLocalData === "true") {
  //   setShow(false);
  // } else {
  //   setShow(false);
  // }
  // }
  // }, []);

  const handleClose = () => {
    localStorage.setItem("isCheckForModel", true);
    setShow(false);
  };

  const handleClose1 = () => {
    setShow1(false);
  };

  const getTokenSold = async () => {
    try {
      const getData = await axiosMain.get(
        `/total-sold-token`,
      );
      let tokenAmount = getData.data.data;
      setTokenSold(tokenAmount)
      let percent = (tokenAmount/120000000)*100
      setTokenSoldPercentage(percent)
    } catch (error) {
      console.log(error);
    }
  }

  var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 1500,
    infinite: true,
    autoplaySpeed: 1500,
    autoplay: false,
    vertical: true,
    verticalSwiping: true,
    beforeChange: (oldIndex, newIndex) => {
      switch (newIndex) {
        case 0:
          setThings("1");
          break;
        case 1:
          setThings("2");
          break;
        case 2:
          setThings("3");
          break;
        case 3:
          setThings("4");
          break;
        default:
      }
    },
  };

  useEffect(() => {
    // console.log("things", things);
  }, [things]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("BadPCDZypLsyRVmSTrTWyyC9o3Q7ySMFr1XofJfLCS1X")
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 2500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const data = [
    ["Element", "percentage", { role: "style" }],
    ["Marketion", 13, "#E39A1A"], // English color name
    ["Presales", 55, "#DD9E6B"],
    ["Liquidity", 32, "#AE7B4E"], // RGB value


  ];

  const options = {
    title: "",
    bar: { groupWidth: "100%" },
    legend: { position: "bottom" },
  };
  return (
    <>
      <Headerhome />
      <div className="outer-bg-home">
        <section className="banner-sec-new" id="home">
          <img
            src="assets/Compress-img/Solgod_God.webp "
            loading="lazy"
            alt="Img"
          />
          <Container>
            <Row>
              <Col>
                <h3 className="presale-live-text"><i className="fa fa-circle m-2" aria-hidden="true"></i> Presale is LIVE Now</h3>
                <div className="outer-box-banner">
                  <h1 data-aos="fade-up">
                    Tap into Ancient Wisdom for Modern Wealth
                  </h1>
                  <div className="copy-address-box" data-aos="fade-up">
                    <b>BadPCDZypLsyRVmSTrTWyyC9o3Q7ySMFr1XofJfLCS1X </b>
                    <a onClick={handleCopy} style={{ cursor: "pointer" }}>
                      {copy ? (
                        <span>
                          <i className="fa fa-check m-2" aria-hidden="true"></i>
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-clone m-2" aria-hidden="true"></i>
                        </span>
                      )}
                    </a>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        window.open(
                          "https://solscan.io/token/BadPCDZypLsyRVmSTrTWyyC9o3Q7ySMFr1XofJfLCS1X",
                          "_blank"
                        );
                      }}
                    >
                      <i class="fa fa-share-square-o" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div className="bottom-banner-line">
                    <p data-aos="fade-right">
                      Some assume I look like a legendary beast, but I've come
                      to straighten out the truth: <br /> I'm a digital
                      trailblazer!
                    </p>

                    <div className="presale-progress-box" data-aos="fade-left">
                      <h4>Presale Token Sold: <span> {parseInt(tokenSold)} SGODS</span></h4>
                      <ProgressBar variant="info" now={parseInt(tokenSoldPercent)} />
                      <p><span>{parseInt(tokenSoldPercent)}%</span>  <span>100%</span></p>
                      <h6>Accepted: BNB/ETH/MATIC/SOLANA/USDT</h6>
                    </div>


                    {/* <button
                      className="common-btn-home"
                      data-aos="fade-left"
                      onClick={() => {
                        if (isUserAuthenticated) {
                          navigate("/Buycoin");
                        } else {
                          navigate("/Register");
                        }
                      }}
                    >
                      Join Our Community!
                    </button> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="bg-upper-sectns">
          <section className="get-token-sec">
            <Container>
              <Row>
                <Col>
                  <div className="outer-box-banner">
                    <h1 className="common-heading" data-aos="fade-down">
                      Get SGODS Meme Token
                    </h1>
                    <div className="img-row" data-aos="fade-right">
                      <img
                        src="assets/Compress-img/Vex.webp"
                        loading="lazy"
                        alt="Img"
                      />
                      <img
                        src="assets/Compress-img/dex.webp"
                        loading="lazy"
                        alt="Img"
                      />
                      <img
                        src="assets/Compress-img/Jupiter.webp"
                        loading="lazy"
                        alt="Img"
                      />
                      <img
                        src="assets/Compress-img/bird.webp"
                        loading="lazy"
                        alt="Img"
                      />
                      <img
                        src="assets/Compress-img/Raydium.webp"
                        loading="lazy"
                        alt="Img"
                      />
                    </div>

                    <img
                      src="assets/Compress-img/bottom-line.webp"
                      loading="lazy"
                      alt=""
                      data-aos="fade-left"
                      className="bottom-line"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="about-solgod-sec" id="about">
            <Container>
              <h2 className="common-heading" data-aos="fade-down">
                About Solana Gods
              </h2>
              <Row className="align-items-center">
                <Col lg={5}>
                  <img
                    src="assets/Compress-img/pngwing.webp"
                    loading="lazy"
                    alt="Img"
                    className="img-fluid"
                    data-aos="fade-right"
                  />
                </Col>
                <Col lg={6} className="ms-auto" data-aos="fade-left">
                  <p>
                    Explore SGODS Universe, a new meme token where creators can
                    use their creativity to make the best digital gods. Discover
                    the endless possibilities of this blockchain-powered space
                    as you enter this innovative ecosystem.
                  </p>
                  <p>
                    SGODS is redefining the meme phenomena with the collective
                    imagination that acts as the basis of meme mentality, and on
                    the other, state-of-the-art technologies such as blockchain,
                    make the SGODS meme coins innovative in the ids of creative
                    ways of interaction in the crypto space.
                  </p>

                  <div className="text-start">
                    <button
                      className="common-btn-home mt-3"
                      onClick={() => {
                        if (isUserAuthenticated) {
                          navigate("/Buycoin");
                        } else {
                          navigate("/Login");
                        }
                      }}
                    >
                      Buy SGODS Now!
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* <section className="about-solgod-sec">
            <Container>
              <h2 className="common-heading" data-aos="fade-down">
                SGODS TOKENOMICS
              </h2>
              <Row className="align-items-end">
                <Col lg={3} md={6} data-aos="fade-down">
                  <div className="toconomics-box-main mb-5">
                    <img
                      src="assets/Compress-img/Tokenomics1.webp"
                      loading="lazy"
                      alt="Img"
                      className="img-fluid"
                    />
                    <div className="text-box">
                      <h4>Zeus</h4>
                      <p>The Greek God</p>
                      <h5>0/0</h5>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6} data-aos="fade-up">
                  <div className="toconomics-box-main">
                    <img
                      src="assets/Compress-img/Tokenomics2.webp"
                      loading="lazy"
                      alt="Img"
                      className="img-fluid"
                    />
                    <div className="text-box">
                      <h4></h4>
                      <p>The Hindu God</p>
                      <h5>Revoked</h5>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6} data-aos="fade-down">
                  <div className="toconomics-box-main mb-5">
                    <img
                      src="assets/Compress-img/Tokenomics3.webp"
                      loading="lazy"
                      alt="Img"
                      className="img-fluid"
                    />
                    <div className="text-box">
                      <h4></h4>
                      <p>The Greek God</p>
                      <h5>Burned</h5>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={6} data-aos="fade-up">
                  <div className="toconomics-box-main">
                    <img
                      src="assets/Compress-img/Tokenomics4.webp"
                      loading="lazy"
                      alt="Img"
                      className="img-fluid"
                    />
                    <div className="text-box">
                      <h4></h4>
                      <p>The Hindu God</p>
                      <h5>100M</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section> */}

          <section className="about-solgod-sec">
            <Container>
              <h2 className="common-heading" data-aos="fade-down">
                SGODS TOKENOMICS
              </h2>
              <Row>
                <Col lg={7} className="m-auto">
                  {/* <Chart
                  chartType="PieChart"
                  width="100%"
                  height="600px"
                  data={data}
                  options={options}
                /> */}
                  <div className="shadow-box-dash-graph" data-aos="fade-up">
                    <img src="assets/Compress-img/graph2.png" className="img-fluid" alt="" />
                  </div>

                </Col>
              </Row>
            </Container>
          </section>

          <section className="about-solgod-sec">
            <Container>
              <h2 className="common-heading" data-aos="fade-down">
                WHY Solana Gods?
              </h2>
              <Row className="align-items-center">
                <Col lg={4} className="m-auto">
                  <img
                    src="assets/Compress-img/why-img.webp"
                    loading="lazy"
                    alt="Img"
                    className="img-fluid"
                    data-aos="fade-right"
                  />
                </Col>
                <Col
                  lg={10}
                  className="m-auto text-center"
                  data-aos="fade-left"
                >
                  <div className="why-content">
                    <p>
                      Secured and encrypted by blockchain, SGODS assures one of
                      security, trust, and above all, fun in transactions. We
                      are allowing you to participate in the most epic adventure
                      that is informative, fun, and all about community-driven
                      ideas and meme creation excitingly. Ride on this epic
                      journey with us into a meme revolution.
                    </p>
                    <p>
                      Be it a newbie or a crypto expert, we provide a SGODS
                      experience that will always leave you wanting more.
                      Discover the horizons and the potentials the SGODS meme
                      coins have in store for you today.
                    </p>
                    <p>
                      Unleash your creativity in SGODS, where creators craft
                      their own deities to battle it out! Other users can
                      carefully select SGODS and earn rewards if their Gods win
                      and creators can earn royalty income.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="about-solgod-sec token-info-sec">
            <Container>
              <h2 className="common-heading" data-aos="fade-down">
                Solana Gods TOKEN INFO
              </h2>
              <Row className="align-items-center">
                <Col lg={5}>
                  <img
                    src="assets/Compress-img/token-info.webp"
                    loading="lazy"
                    alt="Img"
                    className="img-fluid"
                    data-aos="fade-right"
                  />
                </Col>
                <Col lg={6} className="ms-auto" data-aos="fade-left">
                  <p>
                    SGODS token, which has an 900 Million tokens supply, is the
                    backbone of the SGODS ecosystem. The token is digital money
                    which conducts transactions within the network attracts
                    community members, and also secures the Solana blockchain
                    network. Today, it is being traded at a $0.000555 token
                    price, which means that to purchase 1 million SGODS tokens
                    you would need to spend 555$.
                  </p>
                  <br />

                  <p>
                    <b>
                      Token Address:
                      BadPCDZypLsyRVmSTrTWyyC9o3Q7ySMFr1XofJfLCS1X
                    </b>
                  </p>

                  <p>
                    <b>Token Name: Solana Gods</b>
                  </p>
                  <p>
                    <b>Token Symbol: SGODS</b>
                  </p>
                  <p>
                    <b>Blockchain: Solana</b>
                  </p>
                  <p>
                    <b>Total Supply: 900 Million</b>
                  </p>
                  <p>
                    <b>Price: $0.000555 per SGODS</b>
                  </p>
                  <p>
                    <b>
                      Token Allocation: At $0.000555 per SGODS, acquiring 1
                      million tokens requires a deposit of just $555.
                    </b>
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
        </div>

        <section className="roadmap-solgod-sec" id="roadmap">
          <Container>
            <h2 className="common-heading" data-aos="fade-down">
              SGODS Roadmap
            </h2>
            <Row className="align-items-end">
              <Col lg={12}>
                <div>
                  <ul class="timeline">
                    <div className="upper-design">
                      <img
                        src="assets/Compress-img/upper-design.webp"
                        loading="lazy"
                        alt="Img"
                      />
                    </div>
                    <li class="timeline-inverted" data-aos="fade-left">
                      <div class="timeline-badge warning">
                        <span>1</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Gods Awakening</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            {/* <li>Gods Awakening</li> */}
                            <li>Website Launch</li>
                            <li>Smart Contract Launch</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li data-aos="fade-right">
                      <div class="timeline-badge warning">
                        <span>2</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">GODMode Expansion</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            {/* <li>GODMode Expansion</li> */}
                            <li>10,000 Telegram Follower</li>
                            <li>7,000 Twitter Follower</li>
                            <li>Presale Launch</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li class="timeline-inverted" data-aos="fade-left">
                      <div class="timeline-badge warning">
                        <span>3</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Celestial Ascension</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Exchange Listing</li>
                            <li>Marketing Campaigns Intensify</li>
                            <li>Community Engagement Activities.</li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li data-aos="fade-right">
                      <div class="timeline-badge warning">
                        <span>4</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Mythic Integration</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>NFT Integration for Gods</li>
                            <li>Partnerships with Other Solana Projects</li>
                            <li>Mobile App Development Begins</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li class="timeline-inverted" data-aos="fade-left">
                      <div class="timeline-badge warning">
                        <span>5</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Legendary Conquest</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Launch of Play-to-Earn Game</li>
                            <li>Integration with Major NFT Marketplaces</li>
                            <li>Celebrity Endorsements and Partnerships</li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li data-aos="fade-right">
                      <div class="timeline-badge warning">
                        <span>6</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Cosmic Dominion</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Launch of Merchandise and Collectibles</li>
                            <li>Community Governance Implementation</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li class="timeline-inverted" data-aos="fade-left">
                      <div class="timeline-badge warning">
                        <span>7</span>
                      </div>
                      <div class="timeline-panel">
                        <img
                          className="step-img"
                          src="assets/Compress-img/STEP.webp"
                          loading="lazy"
                          alt="Img"
                        />
                        <div class="timeline-heading">
                          <h4 class="timeline-title">Eternal Evolution</h4>
                        </div>
                        <div class="timeline-body">
                          <ul>
                            <li>Continuous Development and Updates</li>
                            <li>Exploration of Metaverse Opportunities</li>
                            <li>Expansion to Other Blockchains</li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <div className="bottom-design">
                      <img
                        src="assets/Compress-img/bottom-design.webp"
                        loading="lazy"
                        alt="Img"
                      />
                    </div>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <section className="token-utility-sec">
          <Container fluid className=" p-0">
            <Row>
              <Col>
                <div>
                  <h2 className="common-heading" data-aos="fade-down">
                    SGODS TOKEN UTLITY
                  </h2>
                  <div className="outer-box-utility-slider">
                    <img
                      className={
                        things === "1"
                          ? "wheel-box first-rotate"
                          : things === "2"
                          ? "wheel-box second-rotate"
                          : things === "3"
                          ? "wheel-box third-rotate"
                          : "wheel-box fourth-rotate"
                      }
                      src="assets/Compress-img/wheel.webp"
                      alt=""
                    />
                    <Slider className="utility-slider" {...settings}>
                      <div className="item">
                        <div className="utility-outer-box">
                          <div className="main-content">
                            <h2>1</h2>
                            <div>
                              <h3>
                                Create Your Own Gods on the Solana Gods Platform
                              </h3>
                              <p>
                                Through the Solana Gods token, users are given
                                the option to create digital deities, called
                                "Gods". Using the tokenizing feature of
                                contributors may fully reflect their imagination
                                through which they can envisage gods with
                                particular powers, traits and skills that would
                                add unicity to the world of Solana Gods.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="utility-outer-box">
                          <div className="main-content">
                            <h2>2</h2>
                            <div>
                              <h3>Bidding on Solana Gods Competitions</h3>
                              <p>
                                Users can participate in Solana Gods games and
                                competitions where the tokens are utilized.
                                Users can place Solana Gods token on the stake
                                of the game and win an exquisite reward if they
                                succeed. With token-powered bidding, players can
                                compete against each other to gain these Gods
                                and make their strategic gaming experience more
                                and more competitive and therefore increase
                                their chances to gain more tournament victories.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="utility-outer-box">
                          <div className="main-content">
                            <h2>3</h2>
                            <div>
                              <h3>Earning Powers for Solana Gods</h3>
                              <p>
                                Token holders are given the privilege of
                                increasing the powers and attributes of their
                                gods in the ecosystem of the Solana Gods. Users
                                will gain access to unlockable features,
                                top-tier Gods' abilities and superior in-game
                                performance by staking and applying the Solana
                                Gods token.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="utility-outer-box">
                          <div className="main-content">
                            <h2>4</h2>
                            <div>
                              <h3>Earning Rewards via Liquidity Pool</h3>
                              <p>
                                The Solana Gods liquidity pool is where token
                                holders can earn rewards. Moreover, by providing
                                liquidity to the Solana Gods ecosystem, users
                                facilitate the growth and stability of the
                                ecosystem, while earning royalty income via
                                rewards distributed from the liquidity pool.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}

        <section className="how-to-sec pb-2">
          <Container>
            <h2 className="common-heading" data-aos="fade-down">
              HOW TO BUY SGODS?
            </h2>
            <Row>
              <Col lg={11} className="m-auto">
                <Row className="">
                  <Col lg={6} md={6}>
                    <div data-aos="fade-down">
                      <div className="register-outer-box">
                        <h4>1</h4>
                        <p>
                          Visit the Official Website:{" "}
                          <a href="">https://solanagods.com/</a>
                        </p>
                      </div>
                      <div className="register-outer-box">
                        <h4>2</h4>
                        <p>Connect Your Wallet</p>
                      </div>
                      <div className="register-outer-box">
                        <h4>3</h4>
                        <p>Select SGODS Token</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={6}>
                    <div className="outer-box-register" data-aos="fade-up">
                      <img
                        src="assets/Compress-img/HQ_Kratos.png"
                        loading="lazy"
                        className="upper-img-kratos"
                        alt="Img"
                      />
                      <div className="register-outer-box">
                        <h4>4</h4>
                        <p> Enter the Desired Amount</p>
                      </div>
                      <div className="register-outer-box">
                        <h4>5</h4>
                        <p>Review and Confirm Transaction Details</p>
                      </div>
                      <div className="register-outer-box">
                        <h4>6</h4>
                        <p>Receive SGODS Token</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="one-mene-box">
              <Row className="align-items-center">
                <Col lg={5} md={4}>
                  <img
                    src="assets/Compress-img/ONE-MEME.webp"
                    loading="lazy"
                    alt="Img"
                    className="img-fluid"
                    data-aos="fade-right"
                  />
                </Col>
                <Col lg={7} md={8} className="ms-auto" data-aos="fade-left">
                  <h2 className="common-heading">One Meme Coin To Rule</h2>
                  <p>
                    Among the many cryptocurrencies, SGODS is a shining, classy,
                    creative project closely identified with the team of
                    developers. A unique combination of meme culture and
                    blockchain technology, SGODS has become the favourite of
                    crypto millennials and earned a spot as one of the most
                    interesting projects in crypto.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </section>

        {/* <section className="what-make-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={9} className="m-auto text-center" data-aos="fade-left">
                <div className="content">
                  <h2 className="common-heading">
                    What Makes SOLANA GODS Unique
                  </h2>
                  <p>
                    Solana Gods is a unique fusion of creativity, competition,
                    and rewards. Creators are encouraged to channel their
                    imagination onto a digital canvas and flex their creative
                    powers by designing a unique deity. At the same time,
                    participants can engage in a competitive on-chain auction
                    and compete for the most sought-after gods. Once the deity
                    is obtained, players can potentially unlock more rewards by
                    using it to play an array of games. This perfect seamless
                    cooperation between the creators and the players contributes
                    to a more vibrant community unlike any other. It departs
                    from the traditional approach because it combines the unique
                    design with the thrill of competition. Thus, the more a
                    player competes, the better he gets.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}

        <section className="how-to-sec pt-3">
          <Container>
            <Row>
              <Col>
                <div className="dive-box-new" data-aos="fade-up">
                  <h2 className="common-heading">DIVE INTO THE COMMUNITY!</h2>
                  <p>
                    Connect with our community where memes are transformed into
                    mythological deities, giving users a chance to engage in the
                    creation of memes and participation in contests. This meme
                    token leverages the Solana blockchain to provide faster &
                    cheaper transactions, garnering a buzzing congregation of
                    participants. Let's plunge into the idea together – memes &
                    artwork will make the flight a perfect choice.
                  </p>
                  <button
                    className="common-btn-home mt-3"
                    onClick={() => {
                      if (isUserAuthenticated) {
                        navigate("/Buycoin");
                      } else {
                        navigate("/Register");
                      }
                    }}
                  >
                    Join our Community!
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <section className="explore-avtar-sec">
          <Container>
            <Row>
              <Col lg={8} className="m-auto">
                <div>
                  <div className="outer-box-explore-img" data-aos="fade-down">
                    <img
                      src="assets/Compress-img/explore-img.webp"
                      loading="lazy"
                      className="img-fluid center-explore-img"
                      alt="Img"
                    />
                  </div>
                  <h2 className="common-heading" data-aos="fade-right">
                    SGods Avatar Lab
                  </h2>
                  <p data-aos="fade-left">
                    Liked SGods? Show it off with pride! Make your own avatar
                    right now!
                  </p>
                
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}

        <section className="faq-main-sec">
          <Container>
            <Row>
              <Col>
                <h2 className="common-heading" data-aos="fade-down">
                  FREQUENTLY <br /> ASKED QUESTIONS
                </h2>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col lg={7} data-aos="fade-right">
                <Accordion className="faq-accordion" defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What is SGods?</Accordion.Header>
                    <Accordion.Body>
                      SGods is an innovative platform on Solana that allows users
                      to create, collect, and battle memes of fictional gods,
                      and transformations into a digital mythology.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      What is the purpose of SGods meme coin?
                    </Accordion.Header>
                    <Accordion.Body>
                      The main purpose of SGODS meme coin is to offer users an
                      interactive and entertaining way of joining and profiting
                      from the cryptocurrency market. SGODS hopes to democratize
                      using financial memes and blockchain technology and help
                      individuals to be in charge of their financial lives.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      How to participate in the SGODS presale?
                    </Accordion.Header>
                    <Accordion.Body>
                      Participating in the SGODS presale is an easy process. All
                      you will have to do is go to the official SGODS which
                      offers a presale. After that follow the instructions for
                      registration. Once your registration is completed, the
                      SGODS team will provide you with all the necessary
                      information regarding the purchasing of tokens as well as
                      any other instructions or requirements which might appear.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      Can I earn rewards by holding SGODS meme coins?
                    </Accordion.Header>
                    <Accordion.Body>
                      Indeed, SGODS has its own advanced staking and liquidity
                      provision mechanism, allowing its users to generate
                      bonuses. So by dint staking your SGODS tokens or providing
                      liquidity to the exchanges, you get the benefits in the
                      form of gaining more Sogods tokens or otherwise.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      How can I stay updated on SGODS developments?
                    </Accordion.Header>
                    <Accordion.Body>
                      To stay in the circle of SGODS developments follow it on
                      social media, subscribe to our YouTube channel and join
                      the community. Through these channels, you will be getting
                      regular briefs on our project's milestones, partnerships
                      and other crucial announcements. This will keep you
                      updated on all SGODS latest happenings in the world.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
              <Col lg={5} className="m-auto" data-aos="fade-left">
                <img
                  src="assets/Compress-img/faq-img.webp"
                  loading="lazy"
                  className="img-fluid"
                  alt="Img"
                />
              </Col>
            </Row>
          </Container>
          <Footerhome />
        </section>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="presale-popup"
        backdrop="static"
      >
        <div className="outer-bg-signup">
          <h3> Offer Alert</h3>
          <h5 className="color-black">Presale starts in </h5>

          <div className="timer-box-inner">
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimer?.days || "00"}
              </span>{" "}
              <span className="title">Days</span>
            </h4>
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimer?.hours || "00"}
              </span>{" "}
              <span className="title">Hours</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimer?.minutes || "00"}
              </span>{" "}
              <span className="title">Minutes</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimer?.seconds || "00"}
              </span>{" "}
              <span className="title">Seconds</span>
            </h4>
          </div>

          <h5>07 June 2024</h5>
          <button
            className="common-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </button>
        </div>
      </Modal>

      <Modal
        show={show1}
        onHide={handleClose1}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="presale-popup presale-main-popup"
        backdrop="static"
      >
        <div className="outer-bg-signup">
          <h3> Offer Alert</h3>
          <h5 className="color-black">PreSale is LIVE NOW</h5>

          {/* <div className="timer-box-inner">
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimerEND?.days || "00"}
              </span>{" "}
              <span className="title">Days</span>
            </h4>
            <h4>
              <span className="time">
                {" "}
                {privateRemainingTimerEND?.hours || "00"}
              </span>{" "}
              <span className="title">Hours</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimerEND?.minutes || "00"}
              </span>{" "}
              <span className="title">Minutes</span>
            </h4>
            <h4>
              <span className="time">
                {privateRemainingTimerEND?.seconds || "00"}
              </span>{" "}
              <span className="title">Seconds</span>
            </h4>
          </div> */}

          {/* <h5>07 July 2024</h5> */}
          <button
            className="common-btn"
            onClick={() => {
              handleClose1();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
