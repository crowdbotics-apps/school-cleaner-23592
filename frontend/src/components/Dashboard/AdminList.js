import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../modules/actions/UserActions';


const AdminList = () => {

  const dispatch = useDispatch();
  const { users: { loading, success, error, data },
  } = useSelector(({ user }) => user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
    if(success){
      setUsers(data)
      console.log(data, "USER")
    }
  }, []);

  return(
    <div className="modal fade" id="add_admin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="admin-info m-4">
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Abe Doe</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Akash Singh</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Aron Damello</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Avi Bale</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Bunny Regan</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Barry Chris</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
                <div className="d-flex items-center justify-content-between mb-4">
                  <div>Bunny Regan</div>
                  <div><input type="checkbox" className="form-check-input big-checkbox"/></div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center btn-holder">
                <button type="button" class="btn btn-primary text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin">Save</button>
                <button type="button" class="btn btn-primary text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
