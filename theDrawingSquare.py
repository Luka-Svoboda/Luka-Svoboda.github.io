"""
Pygame Starter Code
ATLS 1300/5650
Author: Luka, Olivia, Wolfgang
DATE: 10/26/2022
NOTE: the animation loop is inifinite. You will have to add a conditional
to break the loop, if desired. Infinite looping animation can be used intentionally!
This is a description of what this code does. You should edit this line to get 
full credit on assignments. The code will CONTINUE TO RUN 
(meaning you cannot run it again) until you close the window!

Description: This code is used to create a virtual drawing pad of sorts
The square is now not on its own path but controled by the user using the arrow keys
Along with this, our called function is used to change the color of the "pen"
being used in the drawing process. By tapping the A(red),S(green), and D(blue) keys 
you can change the color of the square by decreasing the color values from 255 by 20 each tap. 
In order to reset your pen color back to white press the SPACEBAR
If you want to clear the screen of anything you've already drawn, press BACKSPACE.

'''"""

import pygame, random
pygame.init() # initialize pygame managers

# create a window
w = 600
h = 600
win = pygame.display.set_mode((w,h)) # define window variable
# pygame.display.set_caption("Read carefully.") # uncomment & edit to caption the window

#setting rgb values to the color WHITE
r = 255
g = 255
b = 255

#======================== Variables & functions ===================================================
def main():
    
    BLACK = (0,0,0)

    running = True # Make sure the code continues to run as long as the condition is met
    
    x,y = 300, 300 #setting the square to initially be drawn in the middle of the screen    

    moveSpeed = 4

    rect = pygame.Rect(300,300,20,20) #creating the "pen" or the object the user draws with


    # Function for chaning the color based off square position
    def editColor():
        # setting color variables to global  for them to be used/called in the conditional
        global r
        global g
        global b

        # Setting the buttons for changing the color of the pen to A, S, and D. Each push of those buttons will reduce the color value of that color by 20 starting at 255
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_a: # Setting red color decrease to A
                    r -= 20
                if event.key == pygame.K_s: # Setting green color decrease to S
                    g -= 20
                if event.key == pygame.K_d: # Setting blue color decrease to D
                    b -=20
                if event.key == pygame.K_SPACE: # Setting Spacebar to rest the color values of the pen/square
                    r = 255
                    g = 255
                    b = 255
                if event.key == pygame.K_BACKSPACE: # Setting Backspace to clear the screen of any trails/pen marks that have been made
                    for i in range (1):
                        win.fill(BLACK)
                
                #ensuring that the color values never reach below 1 as to not let the animation unexpectedly end
                if r <=1:
                    r = 255
                if g <=1:
                    g = 255
                if b <=1:
                    b = 255

        return r,g,b

    #================================ Animation loop ===================================================
    # start values defined here
    running = True
    clock = pygame.time.Clock() # for framerate timing

    while running:
        
        keys = pygame.key.get_pressed() # found this code at https://replit.com/@Rabbid76/PyGame-ContinuousMovement#main.py in order to create continuous movement of the shape

        # Movement parameters that allow the x and y position of the square to be increased or decreased according to the button pressed.
        # This movement speed is then multiplied by the variable moveSpeed to allow for a faster and continuous movement
        rect.x += (keys[pygame.K_RIGHT]) * moveSpeed
        rect.x -= (keys[pygame.K_LEFT]) * moveSpeed
        rect.y += (keys[pygame.K_DOWN]) * moveSpeed
        rect.y -= (keys[pygame.K_UP]) * moveSpeed

        # Calling the color change function 
        editColor()

        # Drwaing the square to be used at the "pen"
        pygame.draw.rect(win,(r,g,b),rect)

        # Do not change, remove or augment this loop...yet.
        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False # stops animation
        
        #================== Animation control ===================
        pygame.display.update()
        clock.tick(30)
        # framerate in fps (30-60 is typical)

main() #calling the main function as the last line of code