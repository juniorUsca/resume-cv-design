# HIL: No spaces or comments after otherwise it captures them!
# Determine the platform
UNAME_S := $(shell uname -s)

# CC
ifeq ($(UNAME_S),Darwin)
  CC := clang++ -arch x86_64
else
  CC := g++
endif

# Folders
SRCDIR := src/sources
INCDIR := src/headers
BUILDDIR := build
#TARGETDIR := bin
TARGETDIR := src

# Targets
EXECUTABLE := junkyll
TARGET := $(TARGETDIR)/$(EXECUTABLE)

# Final Paths
INSTALLBINDIR := /usr/local/bin

# Code Lists
SRCEXT := cpp
SOURCES := $(shell find $(SRCDIR) -type f -name *.$(SRCEXT))
OBJECTS := $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SOURCES:.$(SRCEXT)=.o))

# Folder Lists
# Note: Intentionally excludes the root of the include folder so the lists are clean
INCDIRS := $(shell find $(INCDIR)/**/* -name '*.h' -exec dirname {} \; | sort | uniq)
INCLIST := $(patsubst $(INCDIR)/%,-I $(INCDIR)/%,$(INCDIRS))
BUILDLIST := $(patsubst $(INCDIR)/%,$(BUILDDIR)/%,$(INCDIRS))

SRCDIRS := $(shell find $(SRCDIR)/**/* -name '*.$(SRCEXT)' -exec dirname {} \; | sort | uniq)
BUILDLIST += $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SRCDIRS))
ifeq ($(BUILDLIST),)
  BUILDLIST := $(BUILDDIR)
endif
# Shared Compiler Flags
#CFLAGS := -c
INC := -I $(INCDIR) $(INCLIST)# -I /usr/local/include
#LIB := -L /usr/local/lib -lsantacruzengine -lsantacruzlib -larcadia -lcorinth -lyaml-cpp -lzmq -lhiredis -lbondoas
LIB := 

#CFLAGS += -std=c++11 -stdlib=libc++ -O2
CFLAGS := -std=c++11 -O2

$(TARGET): $(OBJECTS)
	@mkdir -p $(TARGETDIR)
	@echo "Linking..."
	@echo "$(CC) $^ -o $(TARGET) $(LIB)"
	@echo "  Linking $(TARGET)"; $(CC) $^ -o $(TARGET) $(LIB)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDLIST)
	@echo "$(CC) $(CFLAGS) $(INC) -c -o $@ $<"
	@echo "Compiling $<..."; $(CC) $(CFLAGS) $(INC) -c -o $@ $<

clean:
	@echo "Cleaning $(TARGET)..."; $(RM) -r $(BUILDDIR) $(TARGET)

install:
	@echo "Installing $(EXECUTABLE)..."; cp $(TARGET) $(INSTALLBINDIR)
  
distclean:
	@echo "Removing $(EXECUTABLE)"; rm $(INSTALLBINDIR)/$(EXECUTABLE)

.PHONY: clean