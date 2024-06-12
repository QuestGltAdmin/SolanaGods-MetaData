import React from "react";
import { Headerhome } from "../Component/Headerhome";
import { Footerhome } from "../Component/ui/Footerhome";
import { Col, Container, Row } from "react-bootstrap";

export const Privacy = () => {
  return (
    <>
      <div className="outer-bg-div">
        <Headerhome />
        <section className="privacy-sec">
          <Container>
            <Row>
              <Col lg={10} className="m-auto">
                <div className="privacy-inner-box">
                  <h2 className="common-heading">Privacy Policy</h2>
                  <p>
                    <span>
                      At Solana Gods ("Company", "we", "us", or "our"), we are
                      committed to ensuring that the trust of our fans is
                      preserved. Privacy and confidentiality of personal
                      information are the most valuable for us. If you have
                      doubts or are unsure about the privacy policy or our
                      practices regarding the personal forward your concerns or
                      doubts to{" "}
                    </span>
                    <a href="mailto:info@solanagods.com">
                      <span>info@solanagods.com</span>
                    </a>
                    <span>.</span>
                  </p>
                  <p>
                    <span>
                      This privacy policy outlines how we might use your
                      information when you:
                    </span>
                  </p>
                  <p>
                    <span>Visit our website </span>
                    <a href="https://solanagods.com">https://solanagods.com</a>
                  </p>
                  <p>
                    <span>
                      Interact with us through other different means, including
                      sales, events or marketing.
                    </span>
                  </p>
                  <p>
                    <span>
                      In this document, "Website" presents any web page that is
                      linked to the policy and "Services" are both the Website
                      and other related services.
                    </span>
                  </p>
                  <p>
                    <span>
                      Our goal in creating this privacy policy is to clearly
                      outline the information we collect, how it is used as well
                      as the. Based on this policy, if you disagree with any
                      condition in the policy, you should not use our service.
                      One of the most important things to know when using our
                      services is that our privacy policy governs the way we
                      collect, use, and disclose any personal information from
                      you.
                    </span>
                  </p>
                  <h4>Information Collection:</h4>
                  <p>
                    <span>
                      We are receiving personal information about you that you
                      give us intentionally. This is for example the submittance
                      of info, for the products and the services, activities on
                      our site and contacting us. The personal data that could
                      be gathered can be such as name, email address, or any
                      other inputs deemed as relevant. The Personal Information
                      given must reflect reality, being honest and complete.
                    </span>
                  </p>
                  <h4>Use of Your Information:</h4>
                  <p>
                    <span>
                      We utilize your information on legitimate business
                      grounds, for the legitimate fulfilment of the contract,
                      for legal obligations, and if you consent to let us. We
                      use your details to create an individual account for you
                      and also to help manage it; to connect, communicate, and
                      give you feedback; to comply with security and safety
                      standards; and to optimize your experience with us.
                    </span>
                  </p>
                  <h4>Information Sharing:&nbsp;</h4>
                  <p>
                    <span>
                      Either consent of the individual, compliance with the
                      laws, provision of services, the protection of
                      verifications or business obligations are the reasons for
                      sharing your information. We use permission, legitimate
                      interests, contract fulfilment, legal requirements and
                      vital interests as the basis to share our data.
                    </span>
                  </p>
                  <h4>Cookies and Tracking:</h4>
                  <p>
                    <span>
                      Our cookies and similar technologies may be used to gather
                      and save capable of enhancing your session on our Website
                      experience.
                    </span>
                  </p>
                  <h4>Data Retention:</h4>
                  <p>
                    <span>
                      We store your personal information for no longer than
                      necessary about the goals indicated in this document,
                      subject to the law which may also authorize a longer
                      retention period.
                    </span>
                  </p>
                  <h4>Data Security:</h4>
                  <p>
                    <span>
                      We put in place systemic and technical measures to ensure
                      data security, which is a generally observed fact that no
                      security system is completely safe from an attack.
                    </span>
                  </p>
                  <h4>Your Privacy Rights:</h4>
                  <p>
                    <span>
                      Being situated in a region might cause you to get rights
                      to your data such as your right to look at what
                      information has been collected, correct it and get rid of
                      it.
                    </span>
                  </p>
                  <h4>Do-Not-Track Features:</h4>
                  <p>
                    <span>
                      Presently we are not working on Do-Not-Track signals since
                      it is being hindered by the lack of a standardized
                      mechanism.
                    </span>
                  </p>
                  <h4>Policy Updates:</h4>
                  <p>
                    <span>
                      This privacy policy has to be revised to coordinate with
                      the applicable legislation which can also be used in
                      today's privacy regulations.
                    </span>
                  </p>
                  <h4>Contact Us:</h4>
                  <p>
                    <span>
                      If this policy raises any questions or comments, contact
                      us through the following email address:{" "}
                    </span>
                    <a href="mailto:info@solanagods.com">info@solanagods.com</a>
                  </p>
                  <h4>Review, Update, or Delete Your Data:&nbsp;</h4>
                  <p>
                    <span>
                      According the to applicable laws and regulations of your
                      country you may have the autonomy to request access to,
                      correction of, or deletion of the personal information
                      that we have collected about you. Should you need to
                      request revision, deletion, or data update of your
                      personal information, please feel free to get in touch
                      with us through the contact details provided on our
                      website.
                    </span>
                  </p>
                  <p>
                    <span>
                      This privacy policy is devised to maintain total
                      transparency with you regarding the use and safety of your
                      data on Solana Gods. It is our mission to ensure your
                      trust, and that's why we conduct confidentiality-sensitive
                      operations daily.
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footerhome />
      </div>
    </>
  );
};
