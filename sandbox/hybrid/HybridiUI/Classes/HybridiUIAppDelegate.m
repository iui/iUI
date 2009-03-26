//
//  HybridiUIAppDelegate.m
//  HybridiUI
//
//  Created by Sean Gilligan on 3/26/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import "HybridiUIAppDelegate.h"

@implementation HybridiUIAppDelegate

@synthesize window;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
	NSURL *url = [NSURL URLWithString:@"http://iui.googlecode.com/svn/tags/REL-current/samples/music.html"];
	NSURLRequest *request = [NSURLRequest requestWithURL:url];
	[webView loadRequest:request];
	
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [window release];
    [super dealloc];
}


@end
