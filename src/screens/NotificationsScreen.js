import React, { useEffect } from 'react'
import Radium from 'radium'
import { Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
   getNotifications,
   seeNotifications,
} from '../actions/notificationActions'

const styles = {
   textButton: {
      fontWeight: 600,
      ':hover': {
         cursor: 'pointer',
      },
   },
}

const NotificationScreen = ({ history }) => {
   const dispatch = useDispatch()

   const { error, loading, notifications } = useSelector(
      (state) => state.notificationsGetList
   )

   useEffect(() => {
      dispatch(getNotifications())
      return () => dispatch(seeNotifications())
   }, [])

   const notificationListItem = (not) => {
      switch (not.type) {
         case 'friend-request':
            return (
               <ListGroup.Item key={not._id}>
                  <p>
                     <span
                        key={not._id}
                        style={styles.textButton}
                        onClick={(_) =>
                           history.push(`/user/${not.about_user._id}/profile`)
                        }
                     >{`${not.about_user.name} ${not.about_user.familyName}`}</span>
                     {` ${not.message}`}
                  </p>
               </ListGroup.Item>
            )
         case 'new-friend':
            return (
               <ListGroup.Item key={not._id}>
                  <p>
                     <span
                        key={not._id}
                        style={styles.textButton}
                        onClick={(_) =>
                           history.push(`/user/${not.about_user._id}/profile`)
                        }
                     >{`${not.about_user.name} ${not.about_user.familyName}`}</span>
                     {` ${not.message}`}
                  </p>
               </ListGroup.Item>
            )
         case 'team-request':
            return (
               <ListGroup.Item key={not._id}>
                  <p>
                     <span key={not._id} style={styles.textButton}>
                        {not.about_service.name}
                     </span>
                     {` ${not.message}`}
                  </p>
               </ListGroup.Item>
            )
         default:
            return <ListGroup.Item key={not._id}>{not.message}</ListGroup.Item>
      }
   }

   return (
      // <Card>
      <ListGroup>{notifications.map((x) => notificationListItem(x))}</ListGroup>
      // </Card>
   )
}

export default Radium(NotificationScreen)
