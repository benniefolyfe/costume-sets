import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap"
import { useContext, useEffect, useState } from "react";
import { HabiticaUserContext } from "../../contexts/habitica-user-context";
import { HabiticaUserAPI } from '../../api/interfaces';
import { useNavigate } from "react-router-dom";
import { Divider } from "../divider";

export const UserAuthenticationForm = () => {

  const { authenticateUserData } = useContext(HabiticaUserContext)
  const navigate = useNavigate()

  const [habiticaUserAPI, setHabiticaUserAPI] = useState<HabiticaUserAPI>({
    userId: '',
    apiToken: ''
  });

  const [canSaveData, setCanSaveData] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(false)

  const saveAPIDetails = (userAPI: HabiticaUserAPI, canSaveData: boolean) => {
    localStorage.setItem('userId', userAPI.userId)
    localStorage.setItem('apiToken', userAPI.apiToken)
    localStorage.setItem('canSave', canSaveData.toString())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabiticaUserAPI({
      ...habiticaUserAPI,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked

    setCanSaveData(isChecked)
  }

  const authenticate = async (userAPI: HabiticaUserAPI, canSaveData: boolean) => {
    const response = await authenticateUserData(userAPI)
    setValidated(false)

    if (response === "Success") {
      navigate('/home', { replace: true })
      saveAPIDetails(userAPI, canSaveData)    
      return
    }
    alert('User ID or API Token is invalid!')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidated(true)

    if(!habiticaUserAPI.apiToken) return
    
    authenticate(habiticaUserAPI, canSaveData)
  }

  useEffect(() => {  

    const fetchData = async () => {

      const isSaveEnabled = localStorage.getItem('canSave')

      if (isSaveEnabled === 'true') {
        const habiticaUserAPI = {
          userId: localStorage.getItem('userId') ?? '',
          apiToken: localStorage.getItem('apiToken') ?? ''
        }
        setHabiticaUserAPI({ ...habiticaUserAPI })

        await authenticate(habiticaUserAPI, true)
        navigate('/home', { replace: true })
      }
    }
    fetchData()

  }, [])

  return (
    <Row>
      <Col className="text-center">
        <h3>Boss Healing & Reverse Blessing</h3>
        <p className="text-secondary">This tool allows you heal boss health and reverse effects of your Blessing skill to deal damage to your party members.</p>
        
        <Divider />

        <h5 className="mb-4 mt-4">Enter your Habitica API details</h5>
        <Form onSubmit={handleSubmit} name="api-authentication" noValidate validated={validated}>
          <Form.Group className="mb-3 text-start">
            <Form.Label className="text-start">User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user ID"
              onChange={handleChange}
              name="userId"
              value={habiticaUserAPI.userId}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please inform your User ID.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label>API Token</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your API token"
              onChange={handleChange}
              name="apiToken"
              value={habiticaUserAPI.apiToken}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please inform your API Token.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 text-start">
            <Form.Check
              type="checkbox"
              label="Stay authenticated" 
              onChange={handleSaveOption}
              checked={canSaveData}
            />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Authenticate
          </Button>
        </Form>
      </Col>
    </Row>
  )
}