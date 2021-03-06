/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.adobe.ac.pmd.rules.mxml;

import com.adobe.ac.pmd.rules.core.AbstractFlexRule;
import com.adobe.ac.pmd.rules.core.AbstractFlexRuleTest;
import com.adobe.ac.pmd.rules.core.ViolationPosition;

public class TooLongScriptBlockRuleTest extends AbstractFlexRuleTest
{
   @Override
   public AbstractFlexRule getRule()
   {
      return new TooLongScriptBlockRule();
   }

   @Override
   protected ExpectedViolation[] getExpectedViolatingFiles()
   {
      return new ExpectedViolation[]
      { new ExpectedViolation( "bug.Duane.mxml", new ViolationPosition[]
       { new ViolationPosition( 28, 128 ) } ),
                  new ExpectedViolation( "bug.FlexPMD233b.mxml", new ViolationPosition[]
                  { new ViolationPosition( 49, 129 ) } ),
                  new ExpectedViolation( "DeleteButtonRenderer.mxml", new ViolationPosition[]
                  { new ViolationPosition( 35, 89 ) } ),
                  new ExpectedViolation( "com.adobe.ac.ncss.mxml.IterationsList.mxml",
                                         new ViolationPosition[]
                                         { new ViolationPosition( 26, 80 ) } ) };
   }
}
