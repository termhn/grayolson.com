import React, {PropTypes} from "react"
import Helmet from "react-helmet"
import { BodyContainer, joinUri } from "phenomic"
import {css} from "glamor"
import Container from "../../components/Container"

const styles = {
    iframe: css({
        height: '100vh'
    }),
}

class Asteroids extends React.Component {

    componentDidMount () {
        var asteroidsFrame = document.getElementById('asteroids-frame')
        asteroidsFrame.focus();
        setTimeout(asteroidsFrame.focus, 200)
        asteroidsFrame.onblur = function() {
            asteroidsFrame.focus();
        }
    }
    
    render() { 
            
        const {
            __url,
            body,
            head
        } = this.props
        
        const metaTitle = head.title
        const meta = [
        { property: "og:type", content: "article" },
        { property: "og:title", content: metaTitle },
        {
        property: "og:url",
        content: joinUri(process.env.PHENOMIC_USER_URL, __url),
        }
        ]
    
        return(
            <div id="asteroids">
                <Helmet title={ metaTitle }
                        meta={ meta } />
                <BodyContainer>
                    <Container>
                    <iframe id="asteroids-frame" src="/assets/asteroids/" {...styles.iframe} autoFocus></iframe>
                    </Container>
                    {body}
                </BodyContainer>
            </div>
        )
    }
}

Asteroids.propTypes = {
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}

export default Asteroids