import { Row, Col } from 'react-bootstrap'
import { Divider } from '../divider'

export const CreditsAcknowledgments = () => {
  return (
    <Row>
      <Col>
        <h2 className='text-center mb-3'>Credits & Acknowledgments</h2>
        <Divider />
        <ul className='mt-3'>

          <li>
            <p>
              <a href='https://github.com/crookedneighbor/habitica-avatar' target="_blank" rel="noreferrer">Habitica Avatar</a> by crookedneighbor
            </p>   
          </li>

          <li>
            <p>
              <a href="https://wallpapers.com/wallpapers/creepy-pumpkin-haunted-mansion-0zmssfxqa0i7agye.html" target="_blank" rel="noreferrer">
                Background by yourleastfavoriteperson</a> on Wallpapers.com
            </p>        
          </li>

          <li>
            <p>
              <a href="https://habitica.com/profile/377a4d3d-c55c-48b8-9bf8-59b97480daf8" target="_blank" rel="noreferrer">@benniefolyfe</a>
              &nbsp;for making a wiki page for this app and the Set Self-Buffs script where I took inspirations, discoveries, and helped me to build this tool.
            </p>
          </li>

          <li>
            <p>
              <a href="https://habitica.com/profile/550a7589-bf0f-4bca-b9ce-6f5343cce99a" target="_blank" rel="noreferrer">@Islleo</a>
              &nbsp;for the incentive to share and allowing to use this tool on his party The First Academy.
            </p>        
          </li>

          <li>  
            <p>
              <a href="https://habitica.com/profile/2454e616-d34c-48d6-ba00-2d7471faaea8" target="_blank" rel="noreferrer">@Valkhirya</a> 
              &nbsp;who took courage and was the first to test my tool.
            </p>
          </li>

        </ul>
      </Col>
    </Row>
  )
}