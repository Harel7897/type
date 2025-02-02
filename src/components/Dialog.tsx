import React, { useState, useEffect, useRef } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
import { XYPosition } from '../Types/Position'
import './Dialog.css'
// import { DisplayMode } from '../../enums/DiplayMode'

type DialogProps = {
  onClose: () => void
  open: boolean
  children?: React.ReactNode
  onSubmit?: () => void
  width?: number
  height?: number
  style?: React.CSSProperties
  BodyStyle?: React.CSSProperties
  draggble?: boolean
  cancelButtonStyle?: string
  submitButtonStyle?: string
  className?: string
  backgroundDark?: React.CSSProperties['backgroundColor']
  backgroundLight?: React.CSSProperties['backgroundColor']
}
function Dialog({
  onClose,
  open,
  children,
  onSubmit,
  width = 500,
  height = 500,
  style,
  BodyStyle,
  draggble = true,
  cancelButtonStyle,
  submitButtonStyle,
  className = '',
  backgroundDark,
  backgroundLight,
}: DialogProps) {
  const updatedHeight = height + 100
  const [position, setPosition] = useState<XYPosition>({
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 2 - updatedHeight / 2,
  })
  const [fadeOpen, setFadeOpen] = useState<boolean>(false)
  const isDragging = useRef<boolean>(false)
  const startPoint = useRef<number>(0)
  // const { isDarkMode } = useAuth()
  // const darkMode: DisplayMode = isDarkMode
     
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    isDragging.current = true

    startPoint.current = e.nativeEvent.offsetX
    setPosition({
      x: e.clientX - e.nativeEvent.offsetX,
      y: e.clientY - e.nativeEvent.offsetY,
    })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    // More logic to handle the start of dragging
  }

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      setPosition((prev) => {
        return { x: e.clientX - startPoint.current, y: e.clientY - 15 }
      })
      // More logic to update the position
    }
  }

  const onMouseUp = () => {
    isDragging.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    // Logic to stop dragging
  }

  const TheHandleClose = () => {
    isDragging.current = false
    setFadeOpen(false)
    setTimeout(() => {
      onClose()
    }, 150)
  }
  useEffect(() => {
    if (open) setFadeOpen(true)
  }, [open])
  // useEffect(() => { console.log(isDragging.current)}, [isDragging.current])
  return (
    <>
      {open && (
        <>
          <div
            onClick={TheHandleClose}
            className="dialog-background"
            style={{ opacity: fadeOpen ? 0.5 : 0 }}
          ></div>
          <div
            style={{
              left: draggble ? `${position.x}px` : '50%',
              transform: !draggble ? 'translate(-50%,-50%)' : 'translate(0,0)',
              top: draggble ? `${position.y}px` : '50%',
              width,
              height: draggble ? updatedHeight : height,
              display: 'flex',
              flexDirection: 'column',
              // justifyContent:"flex-end",
              // animation: fadeOpen ? 'fadeIn 1s ease-out' :'fadeOut 0.3s ease-out'

              opacity: fadeOpen ? 1 : 0,
              backgroundColor:"FFF",
                // backgroundDark !== undefined || backgroundLight !== undefined
                //   ? darkMode
                //     ? backgroundDark
                //     : backgroundLight
                //   : undefined,
              ...style,
            }}
            className="dialog"
            // id={darkMode}
          >
            <div
              onMouseDown={(e) => {
                if (draggble) onMouseDown(e)
              }}
              style={{
                width: '100%',
                height: '10px',
                background: draggble ? '#24527a' : 'transparent',
                //  cursor: isDragging.current? 'grabbing' : 'grab'
              }}
            ></div>
            <div
              className={className}
              style={{ flexGrow: 1, overflowY: 'auto', ...BodyStyle }}
            >
              {children}
            </div>
            <div
              style={{
                display: 'flex',
                height: '70px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 'auto',
              }}
            >
              {onSubmit ? (
                <button
                  className={
                    submitButtonStyle ? submitButtonStyle : 'button-87'
                  }
                  onClick={onSubmit}
                >
                  Submit
                </button>
              ) : null}
              <button
                className={cancelButtonStyle ? cancelButtonStyle : 'button-87'}
                onClick={TheHandleClose}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Dialog
