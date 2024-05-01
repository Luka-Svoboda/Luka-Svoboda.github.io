"""
Pygame Starter Code
ATLS 1300/5650
Author: Parker Roth, Tea Gostomski, Micah Higgins, Luka Svoboda, and Vanica Chhay
DATE
NOTE: Description: It is your job to defend the north pole from evil. As Santa Claus, your job is to eliminate every elf on the screen 
by shooting a snowball at them. If you are able to get rid of all of the evil elves within the time limit, you win. 
If you fail to eliminate all the leves in time, you lose.

      Instructions: move with right + left arrow keys and fire snowballs with spacebar
'''"""
import pygame, random  
pygame.init() # initialize pygame managers
# create a window
w = 600
h = 600
win = pygame.display.set_mode((w,h)) # define window variable
# pygame.display.set_caption("Read carefully.") # uncomment & edit to caption the window
#======================== Variables & functions ===================================================

img_size = (50,100)
img_size2 = (30,30)
# class that creates Santa
class Santa:
 def __init__(self,color,x,y):
      self.color = color
      self.x = x
      self.y = y
      self.img = pygame.image.load("santaimg.png").convert_alpha()
      self.img = pygame.transform.scale(self.img, img_size)
      self.center=(x,y)
      
 # The methods Right and Left allow Santa to move right and left and have boundries
 def Right(self):
   if self.x <551:
       self.x +=20
       self.center=(self.x,self.y)
    #    self.rect=self.img.get_rect(center=self.center)
  
 def Left(self): 
    if self.x >0:
       self.x -=20
       self.center=(self.x,self.y)
    #    self.rect=self.img.get_rect(center=self.center)
                   
 
   # method that allows the bubbles to be drawn on the screen
 def show(self):
    #    self.img = pygame.image.load("santaimg.png").convert() 
    #    self.rect=self.img.get_rect(center=self.center)

       win.blit(self.img, self.center)
       #pygame.draw.ellipse(win,self.color,self.img)
 
#Class that creates the elves
class Elves():
   def __init__(self, color, pos_x, pos_y):
       self.color = color
       self.pos_x= pos_x
       self.pos_y = pos_y
       self.square = 20
       self.velocity = 0 # elves start stationary
       self.box = pygame.Rect(self.pos_x,self.pos_y,self.square,self.square)
       self.img2 = pygame.image.load("elfimg.png").convert_alpha()
       self.img2 = pygame.transform.scale(self.img2,img_size2)
       #self.area = pygame.Surface((self.square,self.square))
       self.draw = True
 
  # method that displays the elves
   def Show(self):
       if (self.draw == True):
           win.blit(self.img2, (self.pos_x, self.pos_y))
   
   # method that makes elves dissapear if snowball hits them
   def dissapear(self, box):
        global Dis
        if (self.draw):
            if self.box.colliderect(box): # box is the rect for elf
                Dis += 1 # Each time user hits elf with snowball, value of Dis goes up one
                self.draw = False
            if (Dis == 20): # New victory image shows once 20 collisions occur
              print("Victory! You Saved Christmas!")
              global BG
              BG = False # Makes it so background image stops refreshing
              global SUp
              SUp = False #Snowballs stop moving
              gameDisplay = pygame.display.set_mode((w,h)) # Background Code - https://stackoverflow.com/questions/65009141/in-pygame-how-do-i-make-an-image-the-background#:~:text=Load%20a%20back%20ground%20image%20%28e.g.%20%27background.jpg%27%29%2C%20scale,pygame.transform.smoothscale%20%28background%2C%20gameDisplay.get_size%20%28%29%29%20gameDisplay.blit%20%28background%2C%20%280%2C%200%29%29
              background = pygame.image.load('Victory.png').convert() #Retrieve the image
              background = pygame.transform.smoothscale(background, gameDisplay.get_size()) # Sets the image size to the window size
              gameDisplay.blit(background,  (0, 0)) # Draws the image onto the screen
              global running
              running = False
                
        

   # allows the elves to move up and down continuously
   def Moving (self):
       self.pos_y += self.velocity # Elves move based on velocity value
       if self.pos_y >= 0 and self.pos_y < h/2.4: # Elves accelerate downwards when in top half of screen
         self.velocity +=.3 # Velocity goes up, pos_y goes down
       if self.pos_y > h/2.4: # Elves accelerate upwards when in bottom half of screen
         self.velocity -= .3 # Velocity goes down, pos_y goes up
       self.box = pygame.Rect(self.pos_x,self.pos_y,self.square,self.square)

#Class that creates snowballs
class Snow:
   def __init__(self,color,x,y):
       self.x = x
       self.y = y
       self.color = color
       self.height = 15
       self.length = 15
       self.draw = True
       self.snowy = pygame.draw.ellipse(win,self.color,(self.x,self.y,self.height,self.length))

 # Show snowballs on screen
   def show(self):
       if (self.draw == True):
          self.snowy = pygame.draw.ellipse(win,self.color,self.snowy)
      
      #Snowballs go up
   def upward(self):
       global SUp
       if SUp == True:
        self.snowy.y -= 5
        self.snowy = pygame.draw.ellipse(win,self.color,self.snowy)

 
# class that creates a timer
class Timer:
   def __init__(self,limit):
       self.limit = limit
       self.clock = pygame.time.Clock()
       self.start=pygame.time.get_ticks() # get starter tick at Timer instantiation

      
       self.timeLeft = self.countDown()
      
   def countDown(self):
       '''Note: Will count down based on time passed, not frame rate, or call frequency.
       Retuurns whole value time in seconds (int)'''
       currTime=(self.start + pygame.time.get_ticks())/1500 #calculate how many seconds
      # if self.timeLeft > 0:
       return int(self.limit - currTime) # returns whole second numbers
 
 #================================ Animation loop ===================================================
class Manager:
  def __init__(self):
   self.colors = ((255,255,255),(0,0,0),(173,216,230),(252,36,2),(0,0,255))
   self.ElvesList = []
   self.snowballs=[]
   global SUp
   SUp = True
   global BG
   BG = True
   global Dis
   Dis = 0
  def main(self):
    global running
    running = True
    clock = pygame.time.Clock()
 
    # code that allows elves to show, everytime you play the game the elves have a different x and y
    for i in range(20):
        x = random.randint(0,w-20)
        y= random.randint(0,h/3)
        
        self.ElvesList.append(Elves(self.colors[2],x,y)) # instantiates the elves class
    
   # calls Santa class in a variable called "SantaC"
    SantaC= Santa(self.colors[3],w/2,h-50)

  
    while running:
           # clear window (comment out to have trace behind animation)
        if (BG == True): # Refresh of image can be turned on/off
          gameDisplay = pygame.display.set_mode((w,h)) # Background Code - https://stackoverflow.com/questions/65009141/in-pygame-how-do-i-make-an-image-the-background#:~:text=Load%20a%20back%20ground%20image%20%28e.g.%20%27background.jpg%27%29%2C%20scale,pygame.transform.smoothscale%20%28background%2C%20gameDisplay.get_size%20%28%29%29%20gameDisplay.blit%20%28background%2C%20%280%2C%200%29%29
          background = pygame.image.load('SnowBackground.webp').convert() #Retrieve the image
          background = pygame.transform.smoothscale(background, gameDisplay.get_size()) # Sets the image size to the window size
          gameDisplay.blit(background,  (0, 0)) # Draws the image onto the screen
         
         
         # for every elf created in line 128 they will all show and move, methods of the elves are being called
        for evil in self.ElvesList:
             evil.Show()
             evil.Moving()

      
            
         # method that allows Santa to be shown
        SantaC.show()
  
       #borrowed code in order to display score in left corner (line 141-152)
        font = pygame.font.Font("freesansbold.ttf",32)
        textx = 10
        texty = 10
        timer = Timer(27) # 27  is used because there is a 2 second delay to run the code
        timeLeft =timer.countDown()
         # function that displays timer
        def showtimer(x,y):
                 timing = font.render("Timer :" +str(timeLeft),True,(self.colors[4]))
                 win.blit(timing,(x,y))

        showtimer(textx,texty) # determines where the timer will be displayed 

         # when the game reaches 0 seconds on the timer, "gameover" is displayed to the terminal
        if timeLeft<=0:
             gameDisplay = pygame.display.set_mode((w,h)) # Background Code - https://stackoverflow.com/questions/65009141/in-pygame-how-do-i-make-an-image-the-background#:~:text=Load%20a%20back%20ground%20image%20%28e.g.%20%27background.jpg%27%29%2C%20scale,pygame.transform.smoothscale%20%28background%2C%20gameDisplay.get_size%20%28%29%29%20gameDisplay.blit%20%28background%2C%20%280%2C%200%29%29
             background = pygame.image.load('Defeat.png').convert() #Retrieve the image
             background = pygame.transform.smoothscale(background, gameDisplay.get_size()) # Sets the image size to the window size
             gameDisplay.blit(background,  (0, 0)) # Draws the image onto the screen
    
    
        for s in self.snowballs:
               s.show()
               s.upward()
        # Sees if the rect of snowball and rect of elves has collided, if so the elf dissapears
        for evil in self.ElvesList:
            
            for s in self.snowballs:
                evil.dissapear(s.snowy)
            
                
         

        for event in pygame.event.get():          
            if event.type == pygame.QUIT:
               running = False # stops animation
                
            if event.type == pygame.KEYDOWN:
             # handles key press event
                     if event.key == pygame.K_SPACE:
                       # When the spacebar is pressed, a snowball will be shot out of Santas location
                        self.snowballs.append(Snow(self.colors[0],17.5+ SantaC.x,SantaC.y))
                    
                     if event.key == pygame.K_RIGHT or event.key == pygame.K_d: # santa moves right if right key is clicked. Calls method from Santa's class.
                         SantaC.Right()
                     if event.key == pygame.K_LEFT or event.key == pygame.K_a: # santa moves left if left key is clicked. Calls method from Santa's class.
                         SantaC.Left()

         # snowballs will be shown and move upward
         

        
            
          #================== Animation control ===================
        pygame.display.update()
        clock.tick(30) # framerate in fps (30-60 is typical)
Manager().main() 