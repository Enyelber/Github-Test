import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Modal = ({
  children,
  state,
  changeState,
  title = 'Information',
  showHeader,
  showOverlay,
  positionModal,
  padding,
}) => {
  return (
    <>
      {state && (
        <Overlay showOverlay={showOverlay} positionModal={positionModal}>
          <ContainerModal padding={padding}>
            {showHeader && (
              <HeaderModal>
                <h3>{title}</h3>
              </HeaderModal>
            )}

            <ButtonClose onClick={() => changeState(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-x'
                viewBox='0 0 16 16'>
                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
              </svg>
            </ButtonClose>

            {children}
          </ContainerModal>
        </Overlay>
      )}
    </>
  )
}
Modal.propTypes = {
  children: PropTypes.object,
  state: PropTypes.bool,
  changeState: PropTypes.func,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  showOverlay: PropTypes.bool,
  positionModal: PropTypes.string,
  padding: PropTypes.string,
}
export default Modal

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.showOverlay ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
  padding: 40px;
  display: flex;
  align-items: ${(props) =>
    props.positionModal ? props.positionModal : 'center'};
  justify-content: center;
`

const ContainerModal = styled.div`
  width: 500px;
  //min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: ${(props) => (props.padding ? props.padding : '20px')};
`

const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`

const ButtonClose = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;
  &:hover {
    background: #f2f2f2;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`
